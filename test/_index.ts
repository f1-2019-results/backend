require('dotenv').config();
import db, { resetDb } from '../src/db';

before(async function () {
    console.log('asd');
    this.timeout(10000);
    await db.raw('SELECT 0');
})

beforeEach(async function () {
    await resetDb();
});