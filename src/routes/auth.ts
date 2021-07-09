import express from 'express';
import {
  meRequestHandler,
  signInHandler,
  signUpHandler,
} from '../controllers/authController';

const route = express.Router();

route.post('/sign-up', signUpHandler);
route.get('/sign-in', signInHandler);
route.get('/me', meRequestHandler);

export default route;
