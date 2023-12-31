import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('services', (table) => {
        table.increments('id');
        table
            .integer('category_id')
            .references('id')
            .inTable('service_categories')
            .onDelete('SET NULL');
        table.string('name_uz', 100);
        table.string('name_ru', 100);
        table.string('name_en', 100);
        table.text('description_uz');
        table.text('description_ru');
        table.text('description_en');
        table.float('service_price');
        table.string('unit_uz');
        table.string('unit_ru');
        table.string('unit_en');
        table.string('icon');
        table.string('image');
        table.specificType('gallery', 'varchar ARRAY');
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('services');
}
