import { UsersService } from 'api-rest/users/users.service';
import { logger } from 'common/utils';
import { UnAuthorizedException } from 'libs/http-exception/exceptions';
import { jwtPayload } from '../dto/jwt-payload';
import { profileResponse } from '../dto/profile-response';
import { BcryptService } from './bcrypt.service';
import { JwtService } from './jwt.service';

export class AuthService {
    /**
     * @type {AuthService}
     */
    static #instance;

    static getSingleton() {
        if (!AuthService.#instance) {
            AuthService.#instance = new AuthService(
                UsersService.getSingleton(),
                BcryptService.getSingleton(),
                JwtService.getSingleton(),
            );
            logger.info(`[${AuthService.name}] is bundling`);
        }
        return AuthService.#instance;
    }

    /**
     * @type {UsersService}
     */
    #userService;

    /**
     * @type {BcryptService}
     */
    #bcryptService;

    /**
     * @type {JwtService}
     */
    #jwtService;

    constructor(userService, bcryptService, jwtService) {
        this.#userService = userService;
        this.#bcryptService = bcryptService;
        this.#jwtService = jwtService;
    }

    async register(body) {
        body.password = this.#bcryptService.hash(body.password);

        const userId = await this.#userService.createOneAndReturn(body);

        return profileResponse(
            {
                id: userId,
                ...body
            },
            this.#jwtService.sign(jwtPayload(userId, ['VISITOR']))
        );
    }

    async login(body) {
        const userRowDataPackets = await this.#userService.getByUsernameWithRoles(body.username);

        if (!userRowDataPackets.length) {
            throw new UnAuthorizedException('Username or password is incorrect');
        }

        const user = userRowDataPackets[0];
        user.roles = [];

        userRowDataPackets.forEach(row => {
            user.roles.push({
                id: row.role_id,
                name: row.name
            });
        });

        delete user.role_id;
        delete user.user_id;
        delete user.name;

        if (!user || !this.#bcryptService.compare(body.password, user.password)) {
            throw new UnAuthorizedException('Username or password is incorrect');
        }

        return profileResponse(
            user,
            this.#jwtService.sign(jwtPayload(user.id, user.roles))
        );
    }
}
