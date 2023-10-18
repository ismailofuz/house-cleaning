import { Knex } from 'knex';
import { ContestStatus } from '../../src/common/types/enums';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('contests', (table) => {
        table.increments('id');
        table.string('name_uz');
        table.string('name_ru');
        table.string('name_en');
        table.string('description_uz');
        table.string('description_ru');
        table.string('description_en');
        table.integer('powered_by').references('id').inTable('users');
        table.datetime('starts_at');
        table.string('contest_type');
        table.smallint('questions_count');
        table.string('code');
        table.integer('first_place_prize');
        table.integer('second_place_prize');
        table.integer('third_place_prize');
        table.string('status').defaultTo(ContestStatus.PENDING);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('contests');
}
