import { logger } from 'common/utils';
import { knexConnection } from 'database';

export class UserRepository {
    /**
     * @type {UsersService}
     */
    static #instance;

    static getSingleton() {
        if (!UserRepository.#instance) {
            UserRepository.#instance = new UserRepository(knexConnection.table('users'));
            logger.info(`[${UserRepository.name}] is bundling`);
        }
        return UserRepository.#instance;
    }

    /**
     * @type {import('knex').QueryBuilder}
     */
    connection;

    constructor(connection) {
        this.connection = connection;
    }

    builder() {
        return this.connection.clone();
    }

    createOne(data) {
        return this.builder().insert(data);
    }

    getOneBy(fieldName, value, columns = '*') {
        return this.builder().select(columns).where(fieldName, '=', value);
    }

    getAll(offset, limit, columns = '*') {
        return this.builder().select(columns).offset(offset).limit(limit);
    }
}
