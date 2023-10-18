import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('subjects', (table) => {
        table.increments('id');
        table.string('name_uz');
        table.string('name_ru');
        table.string('name_en');
        table.string('photo');
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('subjects');
}
