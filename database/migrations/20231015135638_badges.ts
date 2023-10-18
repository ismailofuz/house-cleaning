import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('badges', (table) => {
        table.increments('id');
        table.string('name_uz');
        table.string('name_ru');
        table.string('name_en');
        table.string('logo');
        table.string('description_uz');
        table.string('description_ru');
        table.string('description_en');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('badges');
}
