import app from './app';
import knex from 'knex';
import knexFile from './db/knexfile';
import db, { resetDb } from './db';
import * as User from './models/User';

async function t() {
    await resetDb();
}

t().catch(err => {
    console.error(err);
    process.exit(1);
})

app.listen(process.env.PORT || 3000);