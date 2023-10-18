import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('user_badges', (table) => {
        table.integer('user_id').references('id').inTable('users');
        table.integer('badge_id').references('id').inTable('badges');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('user_badges');
}
