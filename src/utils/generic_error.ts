/**
 * DRY all 400 generic error
 */

import { Response } from 'express';
import Logger from '../config/winston';

const genericError = (res: Response, error: any = {}) => {
  Logger.error(error);
  return res.status(400).json({
    success: false,
    message: 'Something went wrong !',
    errors: error,
  });
};

export default genericError;
