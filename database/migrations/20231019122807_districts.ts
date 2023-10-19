import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('districts', (table) => {
        table.increments('id').primary();
        table.string('name_uz').notNullable();
        table.string('name_ru').notNullable();
        table.string('name_en').notNullable();
        table.integer('region_id').references('id').inTable('regions');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('districts');
}
