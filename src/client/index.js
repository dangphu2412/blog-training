import express from 'express';
import { blogPageRouter } from './private/blogs';
import { homePageRouter } from './private/home';
import { userPageRouter } from './private/users';
// import { authPageRouter } from './public/auth';

const router = express.Router();

// router.use('/auth', authPageRouter);
router.use('/users', userPageRouter);
router.use('/blogs', blogPageRouter);
router.use('/', homePageRouter);

export const clientRouter = router;
