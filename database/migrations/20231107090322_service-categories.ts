import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('service_categories', (table) => {
        table.increments('id');
        table.string('name_uz', 20);
        table.string('name_ru', 20);
        table.string('name_en', 20);
        table.string('type');
        table.specificType('gallery', 'varchar ARRAY');
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {}
