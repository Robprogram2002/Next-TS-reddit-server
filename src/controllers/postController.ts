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

export const fetchRecentPosts = async (_: Request, res: Response) => {
  try {
    const posts = await Post.find({
      order: {
        createdAt: 'DESC',
      },
      take: 10,
    });

    res.json(posts);
  } catch (err) {
    errorHandler(err, res);
  }
};

export const fetchSiglePost = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params;
  try {
    const post = await Post.findOneOrFail(
      { identifier, slug },
      { relations: ['sub'] }
    );

    res.json({ post });
  } catch (err) {
    errorHandler(err, res);
  }
};
