import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('themes', (table) => {
        table.increments('id');
        table.string('name_uz');
        table.string('name_ru');
        table.string('name_en');
        table
            .integer('section_id')
            .references('id')
            .inTable('subject_sections');
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('themes');
}
