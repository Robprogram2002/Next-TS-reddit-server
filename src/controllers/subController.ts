import { Request, Response } from 'express';
import { isEmpty } from 'class-validator';
import { getRepository } from 'typeorm';
import Sub from '../entity/Sub';
import HttpException from '../utils/Exception';
import errorHandler from '../utils/errorHandler';

export const createSub = async (req: Request, res: Response) => {
  const { name, title, description } = req.body;

  const { user } = res.locals;

  try {
    const errors: any = {};
    if (isEmpty(name)) errors.name = 'Name must not be empty';
    if (isEmpty(title)) errors.title = 'Title must not be empty';

    const sub = await getRepository(Sub)
      .createQueryBuilder('sub')
      .where('lower(sub.name) = :name', { name: name.toLowerCase() })
      .getOne();

    if (sub) errors.name = 'Sub exists already';

    if (Object.keys(errors).length > 0) {
      throw new HttpException(400, 'Bad input data', errors);
    }
  } catch (err) {
    errorHandler(err, res);
  }

  try {
    const sub = new Sub({ name, description, title, user });
    await sub.save();

    res.json({ sub });
  } catch (err) {
    errorHandler(err, res);
  }
};

export const deleteSub = async (req: Request, res: Response) => {
  const { name, title, description } = req.body;

  const { user } = res.locals;

  try {
    const errors: any = {};
    if (isEmpty(name)) errors.name = 'Name must not be empty';
    if (isEmpty(title)) errors.title = 'Title must not be empty';

    const sub = await getRepository(Sub)
      .createQueryBuilder('sub')
      .where('lower(sub.name) = :name', { name: name.toLowerCase() })
      .getOne();

    if (sub) errors.name = 'Sub exists already';

    if (Object.keys(errors).length > 0) {
      throw errors;
    }
  } catch (err) {
    return res.status(400).json(err);
  }

  try {
    const sub = new Sub({ name, description, title, user });
    await sub.save();

    return res.json(sub);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
