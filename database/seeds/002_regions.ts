import { baseRegions } from '../fakers/regions';
import { cleanId } from '../clean-id';
import { Knex } from 'knex';

exports.seed = (knex: Knex) => seed(knex);

const clean = cleanId(baseRegions);

function seed(knex: Knex) {
    return knex('regions')
        .del()
        .then(() => {
            return knex('regions').insert(clean);
        });
}
