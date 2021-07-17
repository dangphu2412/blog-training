import express from 'express';
import { AuthController } from './auth.controller';
import { loginValidator } from './validator/login.validator';

const router = express.Router();

router.post('/register', loginValidator, AuthController.getSingleton().register);

export const authRouter = router;
