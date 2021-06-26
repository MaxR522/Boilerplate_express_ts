import { Request, Response, NextFunction } from 'express';
import redisClient from '../config/db.connect';
import { maxAttemptOnLogin } from '../config/config';
import Logger from '../config/winston';
import genericError from '../utils/generic_error';

const attemptLoginLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const _email = req.body.email.toLowerCase();

  await redisClient.get(`AL_${_email}`, (error: any, data: any) => {
    if (error) {
      genericError(res, error);
    }

    if (!data) {
      return next();
    }

    if (parseInt(data) >= maxAttemptOnLogin) {
      Logger.warn(`Max attempt on ${_email}`);
      return res.status(429).json({
        success: false,
        message: `Too many attempt on ${_email}, try again after 10 min`,
      });
    } else {
      return next();
    }
  });
};

export default attemptLoginLimiter;
