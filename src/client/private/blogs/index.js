import express from 'express';

const router = express.Router();

router.get('/', (req, res) => res.render('pages/blog/blog'));
router.get('/creation', (req, res) => res.render('pages/blog/creation'));

export const blogPageRouter = router;
