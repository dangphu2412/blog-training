// @ts-check

import { Role } from 'common/enum/role.enum';

/**
 * @param {import("knex")} knex
 */
export function up(knex) {
    const roles = Object.values(Role)
        .map(name => ({
            name
        }));
    return knex.table('roles').insert(roles);
}

/**
 * @param {import("knex")} knex
 */
export function down(knex) { return knex.table('roles').delete(); }
