import { validationResult } from 'express-validator';
import { Request, Response } from 'express';

const checkValidationResult = (req: Request, res: Response, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (errors.array().some((element: any) => element.location === 'headers')) {
      return res.status(401).json({
        success: 'false',
        message: 'header error',
        errors: errors.array(),
      });
    }

    if (errors.array().some((element: any) => element.location === 'cookies')) {
      return res.status(401).json({
        success: 'false',
        message: 'cookies error',
        errors: errors.array(),
      });
    }

    return res.status(422).json({
      success: 'false',
      message: 'Params error',
      errors: errors.array(),
    });
  }

  return next();
};

export default checkValidationResult;
