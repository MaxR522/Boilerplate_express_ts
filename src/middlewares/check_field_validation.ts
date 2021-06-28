import { validationResult } from 'express-validator';
import { Request, Response } from 'express';
import Logger from '../config/winston';

const checkValidationResult = (req: Request, res: Response, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (errors.array().some((element: any) => element.location === 'headers')) {
      Logger.error('Missing header');
      return res.status(401).json({
        success: false,
        message: 'header error',
        errors: errors.array(),
      });
    }

    if (errors.array().some((element: any) => element.location === 'cookies')) {
      Logger.error('Missing cookies');
      return res.status(401).json({
        success: false,
        message: 'cookies error',
        errors: errors.array(),
      });
    }

    Logger.error('Wrong or missing params');
    return res.status(422).json({
      success: false,
      message: 'Params error',
      errors: errors.array(),
    });
  }

  return next();
};

export default checkValidationResult;
