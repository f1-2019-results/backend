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
        table.specificType('created_at', 'TIMESTAMP WITH TIME ZONE');
        table.string('email');
        table.string('password_hash').notNullable();
        table.string('hash_type').notNullable();
    });

}
