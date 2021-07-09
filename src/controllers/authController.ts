import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/User';
import { validate } from 'class-validator';
import HttpException from '../utils/Exception';

export const signUpHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, username } = req.body;
  try {
    // chech if there is already a user with this credentials
    const existEmail = await User.findOne({ email: email });
    const existUsername = await User.findOne({ username: username });

    if (existEmail || existUsername) {
      throw new HttpException(
        401,
        'A user already exist with this credentials',
        null
      );
    }

    // instanciated new user
    const user = new User({ email, password, username });

    // validate data
    const errors = await validate(user);
    if (errors.length > 0) {
      throw new HttpException(401, 'Bad input data', errors);
    }

    // save user
    await user.save();

    return res.status(200).json({ message: 'all good' });
  } catch (error) {
    next(error);
  }
};

export const signInHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, username } = req.body;
  try {
    // validate data
    const user = User.create({ email, password, username });
    await user.save();

    return res.status(200).json({ message: 'all good' });
  } catch (error) {
    next(error);
  }
};

export const meRequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, username } = req.body;
  try {
    // validate data
    const user = User.create({ email, password, username });
    await user.save();

    return res.status(200).json({ message: 'all good' });
  } catch (error) {
    next(error);
  }
};
