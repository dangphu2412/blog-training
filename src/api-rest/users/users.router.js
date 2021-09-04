import { jwtAuthenticateMiddleware } from 'api-rest/auth/services/auth.strategy';
import { authorizeRole } from 'api-rest/auth/services/authorization.strategy';
import { Role } from 'common/enum/role.enum';
import express from 'express';
import { UsersController } from './users.controller';

const router = express.Router();

router.get('/', jwtAuthenticateMiddleware, authorizeRole(Role.ADMIN), UsersController.getSingleton().getAll);

export const userRouter = router;
