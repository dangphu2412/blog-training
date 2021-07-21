// @ts-check

import { UserStatus } from 'common/enum/user-status.enum';

/**
 * @param {import("knex")} knex
 */
export function up(knex) {
    return knex.schema.alterTable('users', table => {
        table.string('city');
        table.string('avatar');
        table.integer('age');
        table.enum('status', Object.values(UserStatus)).defaultTo(UserStatus.AVAILABLE);
    });
}

/**
 * @param {import("knex")} knex
 */
export function down(knex) {
    return knex.schema.alterTable('users', table => {
        table.dropColumn('city');
        table.dropColumn('avatar');
        table.dropColumn('age');
        table.dropColumn('status');
    });
}
