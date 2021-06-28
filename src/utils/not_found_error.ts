import { Response } from 'express';
import Logger from '../config/winston';

const notFoundError = (res: Response) => {
  Logger.error('User not found');
  return res.status(404).json({
    success: false,
    message: 'User not found, maybe not registered !',
  });
};

export default notFoundError;
