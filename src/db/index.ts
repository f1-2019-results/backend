import knex from 'knex';
import knexFile from './knexfile';

const db = knex(knexFile.development);
export default db

export async function resetDb() {
    const res = await db.raw(`SELECT 'DROP TABLE "' || tablename || '" cascade;' FROM pg_tables WHERE schemaname = 'public';`)
    const q = res.rows.reduce((old, curr) => old + curr['?column?'], '');
    await db.raw(q);

    await db.transaction(async () => {
        await db.schema.createTable('user', (table) => {
            table.increments();
            table.uuid('uid').unique();
            table.string('username').unique().notNullable();
            table.specificType('createdAt', 'TIMESTAMP WITH TIME ZONE').notNullable();
            table.string('email');
            table.string('passwordHash').notNullable();
        });

        await db.schema.createTable('session', (table) => {
            table.string('id').primary();
            table.integer('userId').notNullable().unsigned().references('id').inTable('user');
            table.specificType('createdAt', 'TIMESTAMP WITH TIME ZONE').notNullable();
            table.specificType('expiresAt', 'TIMESTAMP WITH TIME ZONE').notNullable();
        });

        await db.schema.createTable('track', (table) => {
            table.increments();
            table.string('name').notNullable().unique();
        });

        await db.schema.createTable('game', (table) => {
            table.increments();
            table.string('name').notNullable().unique();
        });

        await db.schema.createTable('race', (table) => {
            table.increments();
            table.integer('gameId').notNullable().references('id').inTable('game');
            table.integer('trackId').notNullable().references('id').inTable('track');
            table.specificType('startTime', 'TIMESTAMP WITH TIME ZONE').notNullable();
        });

        await db.schema.createTable('raceDriver', (table) => {
            table.increments();
            table.string('name');
            table.integer('userId').references('id').inTable('user');
            table.boolean('isAi');
        });

        await db.schema.createTable('raceResult', (table) => {
            table.increments();
            table.integer('raceId').notNullable().references('id').inTable('race');
            table.integer('driverId').notNullable().references('id').inTable('raceDriver');
            table.integer('position').notNullable();
            table.integer('points').notNullable();
        });

        await db.schema.createTable('raceLap', (table) => {
            table.increments();
            table.integer('raceId').notNullable().references('id').inTable('race');
            table.integer('driverId').notNullable().references('id').inTable('raceDriver');
            table.float('sector1');
            table.float('sector2');
            table.float('sector3');
            table.boolean('invalid');
        });

    });

}
