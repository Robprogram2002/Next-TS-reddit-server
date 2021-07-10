import { Router } from 'express';
import isAuth from '../middlewares/auth';
import { createPost } from '../controllers/postController';

const router = Router();

router.post('/create', isAuth, createPost);

export default router;
