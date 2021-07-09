import express from 'express';
import {
  meRequestHandler,
  signInHandler,
  signUpHandler,
  logout,
} from '../controllers/authController';
import isAuth from '../middlewares/auth';

const route = express.Router();

route.post('/sign-up', signUpHandler);
route.get('/sign-in', signInHandler);
route.get('/me', isAuth, meRequestHandler);
route.get('/logout', isAuth, logout);

export default route;
