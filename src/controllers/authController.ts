import { Request, Response } from 'express';
import { validate, isEmpty } from 'class-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import User from '../entity/User';
import HttpException from '../utils/Exception';
import errorHandler from '../utils/errorHandler';

const mapErrors = (errors: Object[]) =>
  errors.reduce((prev: any, err: any) => {
    const [constraints] = Object.entries(err.constraints);
    const [, value] = constraints;
    // eslint-disable-next-line no-param-reassign
    prev[err.property] = value;
    return prev;
  }, {});

export const signUpHandler = async (req: Request, res: Response) => {
  const { email, password, username } = req.body;
  try {
    // chech if there is already a user with this credentials
    const existEmail = await User.findOne({ email });
    const existUsername = await User.findOne({ username });

    if (existEmail || existUsername) {
      throw new HttpException(
        400,
        'A user already exist with this credentials',
        null
      );
    }

    // instanciated new user
    const user = new User({ email, password, username });

    // validate data
    const errors = await validate(user);
    if (errors.length > 0) {
      throw new HttpException(400, 'Bad input data', mapErrors(errors));
    }

    // save user
    await user.save();

    res.status(200).json({ user });
  } catch (error) {
    errorHandler(error, res);
  }
};

export const signInHandler = async (req: Request, res: Response) => {
  const { password, username } = req.body;
  try {
    const errors: any = {};

    if (isEmpty(username)) errors.username = 'Username must not be empty';
    if (isEmpty(password)) errors.password = 'Password must not be empty';

    if (Object.keys(errors).length > 0) {
      throw new HttpException(400, 'Bad input data', errors);
    }

    const user = await User.findOne({ username });

    if (!user)
      throw new HttpException(
        400,
        'User not found with this credentials',
        null
      );

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      throw new HttpException(400, 'Password is incorrect', null);
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET);

    res.set(
      'Set-Cookie',
      cookie.serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600,
        path: '/api',
      })
    );

    res.status(200).json({ user });
  } catch (error) {
    errorHandler(error, res);
  }
};

export const meRequestHandler = (_: Request, res: Response) =>
  res.json(res.locals.user);

export const logout = (_: Request, res: Response) => {
  res.set(
    'Set-Cookie',
    cookie.serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0),
      path: '/',
    })
  );

  res.status(200).json({ success: true });
};
