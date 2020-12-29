import joi from 'joi';
import { Request, Response } from 'express';

import { ValidationError, InvalidRequestError } from 'errors';
import asyncRequestHandler from 'util/asyncRequestHandler';
import db from 'db';
import RaceLap from 'models/RaceLap';
import Race from 'models/Race';
import RaceResult from 'models/RaceResult';
import trackList from 'data/trackList';

const newRaceValidator = joi.object().keys({
    startTime: joi.string().isoDate(),
    trackId: joi.string(),
    game: joi.string(),
    results: joi.array().items(
        joi.object().keys({
            driverName: joi.string(),
            isAi: joi.boolean(),
            position: joi.number(),
            points: joi.number(),
            laps: joi.array().items(joi.object().keys({
                sectors: joi.array().items(joi.number()),
                position: joi.number(),
                invalid: joi.boolean(),
            }))
        })
    ),
}).strict().options({ abortEarly: false, presence: 'required', });

export default asyncRequestHandler(async (req: Request, res: Response) => {
    const { value, error } = joi.validate(req.body, newRaceValidator);
    if (error)
        throw new ValidationError(error.message);
    const body = value as NewRaceBody;

    const game = await db.games.findOne({ where: { name: body.game } });
    if (!game)
        throw new InvalidRequestError(`Game "${body.game}" not found`);
    const track = await db.tracks.findOne({ where: { name: trackList[body.trackId] } });
    if (!game)
        throw new InvalidRequestError(`Track "${body.trackId}" not found`);

    const raceData = {
        startTime: new Date(body.startTime),
        track,
        game,
        results: body.results.map(resultData => new RaceResult({
            driverName: resultData.driverName,
            isAi: resultData.isAi,
            position: resultData.position,
            points: resultData.points,
            laps: resultData.laps.map((lapData, lapNum) => new RaceLap({
                invalid: lapData.invalid,
                lapnum: lapNum + 1,
                sectors: lapData.sectors,
            })),
        })),
    };

    const race = new Race(raceData);
    console.log(race.id);
    const createdRace = await db.races.save(race);
    console.log(createdRace.id);
    res.json(createdRace);
});

interface NewRaceBody {
    startTime: string
    trackId: string
    game: string,
    results: Array<{
        driverId: string
        driverName: string
        isAi: boolean
        position: number
        points: number
        laps: Array<{
            sectors: Array<number>
            position: number
            invalid: boolean
        }>
    }>
}
