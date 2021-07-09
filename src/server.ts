import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import errorHandler from './middlewares/ErrorHandler';
import authRoutes from './routes/auth';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/test', (req, res) => {
  res.send('test passed');
});

app.use('/api/auth/', authRoutes);

app.use(errorHandler);

app.listen(process.env.Port || 5000, async () => {
  console.log('server is running on http://localhost:5000');

  try {
    const connection = await createConnection();
    console.log('databse conected successfully');
  } catch (error) {
    console.log(error);
  }
});
