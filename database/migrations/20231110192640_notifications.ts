import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('notifications', (table) => {
        table.increments('id');
        table.integer('user_id').references('id').inTable('users');
        table.boolean('is_read').defaultTo(false);
        table.string('message', 600);
        table.string('type').comment('Web, Mobile');
        table.string('status').defaultTo('active');
        table.boolean('is_for_all');
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('notifications');
}
