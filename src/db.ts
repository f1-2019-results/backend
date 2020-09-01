import { getConnection, createConnection, Repository } from 'typeorm';
import Game from './models/Game';
import Race from './models/Race';
import RaceLap from './models/RaceLap';
import RaceResult from './models/RaceResult';
import Session from './models/Session';
import Track from './models/Track';
import User from './models/User';

interface DbRepositories {
    games: Repository<Game>;
    races: Repository<Race>;
    raceLaps: Repository<RaceLap>;
    raceResults: Repository<RaceResult>;
    sessions: Repository<Session>;
    tracks: Repository<Track>;
    users: Repository<User>;
}

// This should always be initialized before usage
const db = {} as DbRepositories;
export default db;

export async function resetDb(): Promise<void> {
    await getConnection().transaction(async manager => {
        await Promise.all([
            manager.delete(Game, {}),
            manager.delete(Race, {}),
            manager.delete(RaceLap, {}),
            manager.delete(RaceResult, {}),
            manager.delete(Session, {}),
            manager.delete(Track, {}),
            manager.delete(User, {}),
        ]);
    });
}

export async function initDb(): Promise<void> {
    console.log(process.env.PG_URL);
    const connection = await createConnection({
        type: 'postgres',
        url: process.env.PG_URL,
        entities: [Game, Race, RaceLap, RaceResult, Session, Track, User],
    });
    await connection.synchronize();
    db.games = connection.getRepository(Game);
    db.races = connection.getRepository(Race);
    db.raceLaps = connection.getRepository(RaceLap);
    db.raceResults = connection.getRepository(RaceResult);
    db.sessions = connection.getRepository(Session);
    db.tracks = connection.getRepository(Track);
    db.users = connection.getRepository(User);
}
