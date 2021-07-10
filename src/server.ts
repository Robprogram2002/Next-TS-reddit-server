import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth';
import postRoutes from './routes/postRoutes';
import subRoutes from './routes/subRoutes';
import trim from './middlewares/trimParser';

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cookieParser());
app.use(trim);

app.get('/test', (req, res) => {
  res.send('test passed');
});

app.use('/api/auth/', authRoutes);
app.use('/api/posts/', postRoutes);
app.use('/api/subs/', subRoutes);

// app.use(errorHandler);

app.listen(process.env.Port || 5000, async () => {
  console.log('server is running on http://localhost:5000');

  try {
    await createConnection();
    console.log('databse conected successfully');
  } catch (error) {
    console.log(error);
  }
});
