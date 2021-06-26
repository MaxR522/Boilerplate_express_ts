/**
 * DRY all 400 generic error
 */

import { Response } from 'express';

const genericError = (res: Response, error: any) => {
  return res.status(400).json({
    success: false,
    message: 'Something went wrong !',
    errors: error,
  });
};

export default genericError;
