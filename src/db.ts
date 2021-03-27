import { getConnection, createConnection, Repository } from 'typeorm';
import bcrypt from 'bcrypt';
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
            manager.delete(RaceLap, {}),
            manager.delete(RaceResult, {}),
            manager.delete(Race, {}),
            manager.delete(Session, {}),
            manager.delete(Track, {}),
            manager.delete(User, {}),
            manager.delete(Game, {}),
        ]);
    });
}

export async function initDb(): Promise<void> {
    const pgUrl = process.env.NODE_ENV === 'test' ? process.env.PG_URL_TEST : process.env.PG_URL;

    console.log(pgUrl);
    const connection = await createConnection({
        type: 'postgres',
        url: pgUrl,
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

    // FIXME: Quite ugly to do this here
    const game = !!await db.games.findOne({ where: { name: 'F1 2019' } });
    if (!game) {
        await db.games.save(new Game({ name: 'F1 2019' }));
        await db.tracks.save(new Track({ name: 'Melbourne' }));
        await db.users.save(new User({
            email: 'testuser@test.com',
            username: 'testUser',
            passwordHash: await bcrypt.hash('hunter2', 12),
        }));
    }

}
