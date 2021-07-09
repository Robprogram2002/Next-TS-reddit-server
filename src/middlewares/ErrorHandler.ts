import { Response, Request } from 'express';
import HttpException from '../utils/Exception';

const errorHandler = (error: HttpException, req: Request, res: Response) => {
  const resObject = {
    status: error.status || 500,
    message: error.message || 'Something went wrong',
    data: null,
  };

  if (error.data) resObject.data = error.data;

  return res.status(resObject.status).send(resObject);
};

export default errorHandler;
