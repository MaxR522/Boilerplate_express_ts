import { validationResult } from 'express-validator';
import { Request, Response } from 'express';

const checkValidationResult = (req: Request, res: Response, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // if element.location === 'body' means the params is not missing but invalid
    return res.status(422).json({
      success: 'false',
      message: 'Params error',
      errors: errors.array(),
    });
  }

  return next();
};

export default checkValidationResult;
