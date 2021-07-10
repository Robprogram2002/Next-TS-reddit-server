import { Request, Response } from 'express';
import Post from '../entity/Post';
import Sub from '../entity/Sub';
import errorHandler from '../utils/errorHandler';
import HttpException from '../utils/Exception';

export const createPost = async (req: Request, res: Response) => {
  const { title, body, sub } = req.body;

  const { user } = res.locals;

  if (title.trim() === '') {
    throw new HttpException(400, 'Title must not be empty', null);
  }

  try {
    // find sub
    const subRecord = await Sub.findOneOrFail({ name: sub });

    const post = new Post({ title, body, user, sub: subRecord });
    await post.save();

    res.json({ post });
  } catch (error) {
    errorHandler(error, res);
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const { title, body, sub } = req.body;

  const { user } = res.locals;

  if (title.trim() === '') {
    return res.status(400).json({ title: 'Title must not be empty' });
  }

  try {
    // find sub
    const subRecord = await Sub.findOneOrFail({ name: sub });

    const post = new Post({ title, body, user, sub: subRecord });
    await post.save();

    return res.json(post);
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
