import db from '../db';

interface RaceData {
    track: {
        id: number;
        name: string;
    }
    game: {
        name: string;
    }
    startTime: Date;
    results: Array<{
        driver: {
            id: number;
            name: string;
        }
        position: number;
        points: number;
        laps: Array<{
            sector1: number;
            sector2: number;
            sector3: number;
            invalid: boolean;
        }>;
    }>
};

interface RaceInsertData {
    trackId: number;
    game: string;
    startTime: Date;
    results: Array<{
        driver: {
            name: string;
            isAi: boolean;
        }
        position: number;
        points: number;
        laps: Array<{
            sector1: number;
            sector2: number;
            sector3: number;
            invalid: boolean;
        }>;
    }>
};

export async function create(data: RaceInsertData) {
    await db.transaction(async (trx) => {
        const raceId = (await trx('race').insert({
            trackId: data.trackId,
            startTime: data.startTime,
        }, ['id']))[0];
        const driverIds = (await trx('raceDriver').insert(
            data.results.map(r => ({
                name: r.driver.name,
                isAi: r.driver.isAi,
            }))
        ), ['id'])[0];
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
                    curr.laps.map(lap => ({
                        raceId,
                        ...lap,
                    }))
                );
            }, [] as any)
        );
    });
}