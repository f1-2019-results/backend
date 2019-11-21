import knex from 'knex';
import knexFile from './knexfile';

const db = knex(knexFile.development);
export default db

export async function resetDb() {
    await db.schema.dropTableIfExists('session');
    await db.schema.dropTableIfExists('user');

    await db.schema.createTable('user', (table) => {
        table.increments();
        table.uuid('uid').unique();
        table.string('username').unique().notNullable();
        table.specificType('createdAt', 'TIMESTAMP WITH TIME ZONE');
        table.string('email');
        table.string('passwordHash').notNullable();
    });

    await db.schema.createTable('session', (table) => {
        table.string('id').primary();
        table.integer('userId').notNullable().unsigned().references('id').inTable('user');
        table.specificType('createdAt', 'TIMESTAMP WITH TIME ZONE');
        table.specificType('expiresAt', 'TIMESTAMP WITH TIME ZONE');
    });

}
