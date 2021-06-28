import { Response } from 'express';
import Logger from '../config/winston';

const notFoundError = (res: Response, statusCode: number = 404) => {
  Logger.error('User not found');
  return res.status(statusCode).json({
    success: false,
    message: 'User not found, maybe not registered !',
  });
};

export default notFoundError;
