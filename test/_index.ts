require('dotenv').config();
import config from '../src/config';
import db, { resetDb } from '../src/db';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
const should = chai.should();
const expect = chai.expect;
chai.use(chaiAsPromised);

before(async function () {
    console.log('asd');
    this.timeout(10000);
    await db.raw('SELECT 0');
});

const defaultConfig: Partial<typeof config> = {
    bcryptWorkFactor: 4,
    defaultSessionLength: 1000 * 60 * 60 * 24,
    sessionTokenBytes: 16,
    user: {
        minPasswordLength: 8,
        minUsernameLength: 3,
    }
}

beforeEach(async function () {
    await resetDb();
    await db('game').insert({ name: 'F1 2019' });
    await db('track').insert({ name: 'Monaco' });
    Object.assign(config, defaultConfig);
});

export {
    expect,
    should
};
