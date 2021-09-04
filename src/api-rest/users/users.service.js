import { DEFAULT_PAGE, DEFAULT_SIZE } from 'common/constants/query.constant';
import { logger } from 'common/utils';
import { toSearchValue } from 'common/utils/query';
import { DuplicateException } from 'libs/http-exception/exceptions';
import { SortCriteria } from 'modules/query/sort/sort-criteria';
import { UserRepository } from './user.repository';

export class UsersService {
    /**
     * @type {UsersService}
     */
    static #instance;

    static getSingleton() {
        if (!UsersService.#instance) {
            UsersService.#instance = new UsersService(UserRepository.getSingleton());
        }
        logger.info(`[${UsersService.name}] is bundling`);
        return UsersService.#instance;
    }

    /**
     * @type {UserRepository}
     */
    #userRepository;

    constructor(userRepository) {
        this.#userRepository = userRepository;
    }

    async createOneAndReturn(data) {
        try {
            const [id] = await this.#userRepository.createOne(data);
            return id;
        } catch (error) {
            throw new DuplicateException(`username: ${data.username} has been existed`);
        }
    }

    async getByUsernameWithRoles(username) {
        const rows = await this.#userRepository.getOneBy('username', username)
            .leftJoin('users_roles', 'users_roles.user_id', '=', 'users.id')
            .leftJoin('roles', 'users_roles.role_id', '=', 'roles.id');

        if (!rows.length) {
            return null;
        }

        const user = rows[0];
        user.roles = [];

        rows.forEach(row => {
            user.roles.push({
                id: row.role_id,
                name: row.name
            });
        });

        delete user.role_id;
        delete user.user_id;
        delete user.name;

        return user;
    }

    async getAll(q) {
        const {
            page = DEFAULT_PAGE,
            size = DEFAULT_SIZE,
            ...query
        } = q;

        const rootBuilder = this.#userRepository.builder()
            .select()
            .leftJoin('users_roles', 'users_roles.user_id', '=', 'users.id')
            .leftJoin('roles', 'users_roles.role_id', '=', 'roles.id')
            .distinct('users.id')
            .offset((page - 1) * size)
            .limit(size);

        if (query.s) {
            rootBuilder.where('username', 'like', toSearchValue(query.s));
            rootBuilder.orWhere('full_name', 'like', toSearchValue(query.s));
        }

        const userIds = (await rootBuilder).map(user => user.id);

        const resultBuilder = this.#userRepository.builder()
            .select()
            .leftJoin('users_roles', 'users_roles.user_id', '=', 'users.id')
            .leftJoin('roles', 'users_roles.role_id', '=', 'roles.id')
            .whereIn('users.id', userIds);

        if (query.sort) {
            const sortTransformed = new SortCriteria(query.sort).transform();
            sortTransformed.forEach(sort => {
                resultBuilder.orderBy(sort.column, sort.direction);
            });
        }

        const rows = await resultBuilder;

        return this._toUsers(rows);
    }

    _toUsers(rows) {
        if (!rows.length) {
            return null;
        }

        const users = [];

        let currentUserId;

        for (let i = 0; i < rows.length; i += 1) {
            if (rows[i].user_id !== currentUserId) {
                currentUserId = rows[i].user_id;
                rows[i].roles = [rows[i].role_name];
                users.push(rows[i]);
            } else {
                users[users.length - 1].roles.push(rows[i].role_name);
            }
        }
        return users;
    }
}
