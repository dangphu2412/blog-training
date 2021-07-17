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
     * @type {import('knex').QueryInterface}
     */
    connection;

    constructor(connection) {
        this.connection = connection;
    }

    get connection() {
        return this.connection.clone();
    }

    createOne(data) {
        return this.connection.insert(data);
    }

    getOne(columns = '*') {
        return this.connection.select(columns);
    }
}
