import { Router } from 'express';
import isAuth from '../middlewares/auth';
import { createSub } from '../controllers/subController';

const router = Router();

router.post('/create', isAuth, createSub);

export default router;
