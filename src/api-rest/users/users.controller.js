import { logger } from 'common/utils';
import { OK } from 'http-status';
import { httpExceptionHandler } from 'libs/http-exception/handler/exception.handler';
import { UsersService } from './users.service';

export class UsersController {
    /**
     * @type {UsersController}
     */
    static #instance;

    static getSingleton() {
        if (!UsersController.#instance) {
            UsersController.#instance = new UsersController(UsersService.getSingleton());
            logger.info(`[${UsersController.name}] is bundling`);
        }
        return UsersController.#instance;
    }

    /**
     * @type {UsersService}
     */
    #userService;

    constructor(userService) {
        this.#userService = userService;
    }

    getAll = async (req, res) => {
        try {
            const data = await this.#userService.getAll(req.query);
            return res.status(OK).json({
                data,
                totalRecord: 10,
                totalPage: 5
            });
        } catch (error) {
            return httpExceptionHandler(error)(res);
        }
    }

    createOne = async (req, res) => {
        try {
            const data = await this.#userService.createOneAndReturn(req.query);
            return res.status(OK).json({
                data,
                totalRecord: 10,
                totalPage: 5
            });
        } catch (error) {
            return httpExceptionHandler(error)(res);
        }
    }
}
