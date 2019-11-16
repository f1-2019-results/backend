import knex from 'knex';
import knexFile from './knexfile';

const db = knex(knexFile.development);
export default db

export async function resetDb() {
    await db.schema.dropTableIfExists('user');

    await db.schema.createTable('user', (table) => {
        table.increments();
        table.uuid('uid').unique();
        table.string('username').unique().notNullable();
        table.specificType('createdAt', 'TIMESTAMP WITH TIME ZONE');
        table.string('email');
        table.string('passwordHash').notNullable();
        table.string('hashType').notNullable();
    });

}
