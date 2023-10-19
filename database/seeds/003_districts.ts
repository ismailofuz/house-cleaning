import { districts } from '../fakers/districts';
import { cleanId } from '../clean-id';
import { Knex } from 'knex';

exports.seed = (knex: Knex) => seed(knex);

const clean = cleanId(districts);

function seed(knex: Knex) {
    return knex('districts')
        .del()
        .then(() => {
            return knex('districts').insert(clean);
        });
}
