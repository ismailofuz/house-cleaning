import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('devices', (table) => {
        table.increments('id');
        table.string('name');
        table.string('type').comment('iOS, Android, ...');
        table.string('token');
        table.string('device_id');
        table.integer('user_id').references('id').inTable('users');
        table.boolean('is_active').defaultTo(true);
        table.date('last_logged_in');
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('devices');
}
