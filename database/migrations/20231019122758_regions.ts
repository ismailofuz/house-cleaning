import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('regions', (table) => {
        table.increments('id');
        table.string('name_uz').notNullable();
        table.string('name_ru').notNullable();
        table.string('name_en').notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('regions');
}
