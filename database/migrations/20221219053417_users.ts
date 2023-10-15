import { Knex } from 'knex';
import { Role } from '../../src/common/types/enums';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (table) => {
        table.increments('id');
        table.string('first_name');
        table.string('last_name');
        table.string('phone');
        table.string('email');
        table.string('password');
        table.string('role').defaultTo(Role.USER);
        table.string('avatar');
        table.date('birth_date');
        table.integer('region_id');
        table.integer('dictrict_id');
        table.integer('coins');
        table.boolean('is_online');
        table.string('education');
        table.string('profession');
        table.boolean('is_verify').defaultTo(false);
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
}
