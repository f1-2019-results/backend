require('dotenv').config();
import db, { resetDb } from '../src/db';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.should();
chai.use(chaiAsPromised);

before(async function () {
    console.log('asd');
    this.timeout(10000);
    await db.raw('SELECT 0');
})

beforeEach(async function () {
    await resetDb();
});

const expect = chai.expect;
export {
    expect,
};