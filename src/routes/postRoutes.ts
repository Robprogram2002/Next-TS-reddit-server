import { Router } from 'express';
import isAuth from '../middlewares/auth';
import {
  createPost,
  fetchRecentPosts,
  fetchSiglePost,
} from '../controllers/postController';
import { createPostComment } from '../controllers/commentController';

const router = Router();

// posts actions
router.post('/create', isAuth, createPost);
router.get('/latests', fetchRecentPosts);
router.get('/:identifier/:slug', fetchSiglePost);
// comments actions
router.post('/:identifier/:slug/comments', isAuth, createPostComment);

export default router;
