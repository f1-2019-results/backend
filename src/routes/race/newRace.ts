import joi from 'joi';
import { Request, Response } from 'express';

import { ValidationError, InvalidRequestError } from 'errors';
import asyncRequestHandler from 'util/asyncRequestHandler';
import db from 'db';
import RaceLap from 'models/RaceLap';
import Race from 'models/Race';
import RaceResult from 'models/RaceResult';
import trackList from 'data/trackList';
import teamList from 'data/teamList';

const newRaceValidator = joi.object().keys({
    startTime: joi.string().isoDate(),
    trackId: joi.string(),
    game: joi.string(),
    results: joi.array().items(
        joi.object().keys({
            driverName: joi.string(),
            teamId: joi.number(),
            isAi: joi.boolean(),
            dnf: joi.boolean().optional().default(false),
            startPosition: joi.number(),
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
    const { value, error } = newRaceValidator.validate(req.body);
    if (error)
        throw new ValidationError(error.message);
    const body = value as NewRaceBody;

    const game = await db.games.findOne({ where: { name: body.game } });
    if (!game)
        throw new InvalidRequestError(`Game "${body.game}" not found`);
    const track = await db.tracks.findOne({ where: { name: trackList[body.game][body.trackId] } });
    if (!track)
        throw new InvalidRequestError(`Track "${body.trackId}" not found`);

    const raceData = {
        startTime: new Date(body.startTime),
        track,
        game,
        results: body.results.map(resultData => new RaceResult({
            driverName: resultData.driverName,
            teamName: teamList[resultData.teamId],
            isAi: resultData.isAi,
            dnf: resultData.dnf,
            startPosition: resultData.startPosition,
            position: resultData.position,
            points: resultData.points,
            laps: resultData.laps.map((lapData, lapNum) => new RaceLap({
                invalid: lapData.invalid,
                lapnum: lapNum + 1,
                sectors: lapData.sectors,
                position: lapData.position,
            })),
        })),
    };

    const race = new Race(raceData);
    await db.races.save(race);
    res.json(race);
});

interface NewRaceBody {
    startTime: string
    trackId: string
    game: string,
    results: Array<{
        driverId: string
        driverName: string
        teamId: number
        isAi: boolean
        dnf: boolean
        startPosition: number
        position: number
        points: number
        laps: Array<{
            sectors: Array<number>
            position: number
            invalid: boolean
        }>
    }>
}
