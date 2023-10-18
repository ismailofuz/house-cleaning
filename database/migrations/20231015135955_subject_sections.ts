import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('subject_sections', (table) => {
        table.increments('id');
        table.string('name_uz');
        table.string('name_ru');
        table.string('name_en');
        table.integer('subject_id').references('id').inTable('subjects');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('subject_sections');
}
