import { Request, Response } from 'express';
import Post from '../entity/Post';
import Comment from '../entity/Comment';
import errorHandler from '../utils/errorHandler';

export const createPostComment = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params;
  const { body } = req.body;

  try {
    const post = await Post.findOneOrFail({ identifier, slug });

    const comment = new Comment({
      body,
      user: res.locals.user,
      post,
    });

    await comment.save();

    res.json({ comment });
  } catch (err) {
    errorHandler(err, res);
  }
};

export const sadsjaj = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params;
  const { body } = req.body;

  try {
    const post = await Post.findOneOrFail({ identifier, slug });

    const comment = new Comment({
      body,
      user: res.locals.user,
      post,
    });

    await comment.save();

    return res.json(comment);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ error: 'Post not found' });
  }
};
