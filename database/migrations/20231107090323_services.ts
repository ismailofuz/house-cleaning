import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('sevices', (table) => {
        table.increments('id');
        table.integer('category_id').references('id').inTable('categories');
        table.string('name_uz', 20);
        table.string('name_ru', 20);
        table.string('name_en', 20);
        table.text('description_uz');
        table.text('description_ru');
        table.text('description_en');
        table.float('service_price');
        table.string('unit_uz');
        table.string('unit_ru');
        table.string('unit_en');
        table.string('icon');
        table.string('image');
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('services');
}
