import { Request, Response, NextFunction } from 'express';
import redisClient from '../config/db.connect';
import Logger from '../config/winston';
import genericError from '../utils/generic_error';

const blacklistedAccessCheck = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = req.accessToken;
  const userId = req.userData.sub;

  // Verify if the access token is not blacklisted
  redisClient.get(`BL_${userId}`, (error, data) => {
    if (error) {
      genericError(res, error);
    }

    if (data === accessToken) {
      Logger.warn('Access-token already blacklisted');
      return res.status(401).json({
        success: false,
        message: 'you are logged out, please login again',
      });
    }

    next();
  });
};

export default blacklistedAccessCheck;
