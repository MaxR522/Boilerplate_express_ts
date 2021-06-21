import { Request, Response, NextFunction } from 'express';
import redisClient from '../index';
import { maxAttemptOnLogin } from '../config/config';
import Logger from '../config/winston';

const attemptLoginLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const _email = req.body.email.toLowerCase();

  await redisClient.get(`AL_${_email}`, (error: any, data: any) => {
    if (error) {
      Logger.error(error);
      return res.status(400).json({
        success: 'false',
        message: 'something went wrong',
        errors: error,
      });
    }

    if (!data) {
      return next();
    }

    if (parseInt(data) >= maxAttemptOnLogin) {
      Logger.warn(`Max attempt on ${_email}`);
      return res.status(429).json({
        success: 'false',
        message: `Too many attempt on ${_email}, try again after 10 min`,
      });
    } else {
      return next();
    }
  });
};

export default attemptLoginLimiter;
