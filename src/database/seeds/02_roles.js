// @ts-check

import { Role } from 'common/enum/role.enum';
import { ConfigService } from 'libs/config/config.service';

let PATH_LOOKUP = `${process.cwd()}/.env`;

ConfigService.config({
    cache: false,
    pathLookup: PATH_LOOKUP
});

PATH_LOOKUP = null;

/**
 * @param {import("knex")} knex
 */
exports.seed = async knex => {
    const roles = await knex.table('roles').select();
    const users = await knex.table('users').select().where('username', '<>', 'dangphu241299@gmail.com');

    const usersRolesRecords = users.map(user => ({
        user_id: user.id,
        role_id: (roles.find(role => role.name === Role.VISITOR)).id
    }));

    await knex.table('users_roles').insert(usersRolesRecords);
};
