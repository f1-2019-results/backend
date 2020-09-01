import dotenv from 'dotenv';
dotenv.config();
import config from '../src/config';
import db, { resetDb, initDb } from '../src/db';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Game from '../src/models/Game';
import Track from '../src/models/Track';
const should = chai.should();
const expect = chai.expect;
chai.use(chaiAsPromised);

before(async function () {
    await initDb();
});

const defaultConfig: Partial<typeof config> = {
    bcryptWorkFactor: 4,
    defaultSessionLength: 1000 * 60 * 60 * 24,
    sessionTokenBytes: 16,
    user: {
        minPasswordLength: 8,
        minUsernameLength: 3,
    }
};

beforeEach(async function () {
    await resetDb();
    await db.games.save(new Game({ name: 'F1 2019' }));
    await db.tracks.save(new Track({ name: 'Monaco' }));
    Object.assign(config, defaultConfig);
});

export {
    expect,
    should
};
