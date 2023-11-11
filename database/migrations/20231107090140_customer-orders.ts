import { Knex } from 'knex';
import { OrderStatus } from './../../src/common/types/enums';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('customer_orders', (table) => {
        table.increments('id');
        table.string('phone');
        table.string('name');
        table.string('address');
        table
            .integer('service_id')
            .references('id')
            .inTable('services')
            .onDelete('SET NULL');
        table.string('status').defaultTo(OrderStatus.PENDING);
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('customer_orders');
}
