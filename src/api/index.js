import express from 'express';
import { authRouter } from './auth/router';
import { userRouter } from './user/router';

const router = express.Router();

router.use('/v1/auth', authRouter);
router.use('/v1/users', userRouter);

export default router;
