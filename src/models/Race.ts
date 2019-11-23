import db from '../db';

interface RaceData {
    track: {
        id: number;
        name: string;
    };
    game: {
        name: string;
    };
    startTime: Date;
    results: Array<{
        driver: {
            id: number;
            name: string;
            isAi: boolean;
        };
        position: number;
        points: number;
        laps: Array<{
            sector1: number;
            sector2: number;
            sector3: number;
            invalid: boolean;
        }>;
    }>;
};

interface RaceInsertData {
    trackId: number;
    game: string;
    startTime: Date;
    results: Array<{
        driver: {
            name: string;
            isAi: boolean;
        };
        position: number;
        points: number;
        laps: Array<{
            sector1: number;
            sector2: number;
            sector3: number;
            invalid: boolean;
        }>;
    }>;
};

export async function create(data: RaceInsertData) {
    await db.transaction(async (trx) => {

        const raceId = (await trx('race').insert({
            trackId: data.trackId,
            startTime: data.startTime,
            gameId: trx('game').select('id').where({ name: data.game }),
        }, ['id']))[0].id;

        const driverIds = (await trx('raceDriver').insert(
            data.results.map(r => ({
                name: r.driver.name,
                isAi: r.driver.isAi,
            })), ['id'])
        ).map(r => r.id);

        await trx('raceResult').insert(
            data.results.map((r, i) => ({
                raceId,
                driverId: driverIds[i],
                position: r.position,
                points: r.points,
            }))
        );
        await trx('raceLap').insert(
            data.results.reduce((prev, curr, i) => {
                return prev.concat(
                    curr.laps.map((lap, lapNum) => ({
                        raceId,
                        driverId: driverIds[i],
                        lapNum,
                        ...lap,
                    }))
                );
            }, [] as any)
        );
    });
}

export async function findOne(id: number): Promise<undefined | RaceData> {
    const [raceData, raceResults, raceLaps] = await Promise.all([
        db('race')
            .select(['race.*', 'game.id AS gameId', 'game.name AS gameName', 'track.name AS trackName', 'track.id AS trackid'])
            .where({ 'race.id': id })
            .join('game', 'game.id', 'gameId')
            .join('track', 'track.id', 'trackId')
            .first(),
        db('raceResult')
            .select('*')
            .where({ raceId: id })
            .join('raceDriver', 'raceDriver.id', 'driverId')
            .orderBy('raceDriver.id'),
        db('raceLap')
            .select('*')
            .where({ raceId: id })
            .orderBy('driverId')
            .orderBy('lapNum')
    ]);
    console.log({
        race: raceData, raceResults, raceLaps
    })
    if (!raceData)
        return undefined;
    const race = {
        game: {
            name: raceData.gameName,
        },
        startTime: raceData.startTime,
        track: {
            id: raceData.trackId,
            name: raceData.trackName,
        },
        results: raceResults.map(rr => ({
            driver: {
                id: rr.driverId,
                name: rr.name,
                isAi: rr.isAi,
            },
            position: rr.position,
            points: rr.points,
            laps: new Array(),
        })),
    };
    let resultId = 0;
    for (const lap of raceLaps) {
        if (lap.driverId !== race.results[resultId].driver.id) {
            resultId++;
            continue;
        }
        race.results[resultId].laps.push({
            sector1: lap.sector1,
            sector2: lap.sector2,
            sector3: lap.sector3,
            invalid: lap.invalid,
        });
    }
    return race;
}