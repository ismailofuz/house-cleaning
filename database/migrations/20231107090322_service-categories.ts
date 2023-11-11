import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('service_categories', (table) => {
        table.increments('id');
        table.string('name_uz', 100);
        table.string('name_ru', 100);
        table.string('name_en', 100);
        table.string('type');
        table.string('icon');
        table.specificType('gallery', 'varchar ARRAY');
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('service_categories');
}
