import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { accessTokenSecret } from '../config/config';
import Logger from '../config/winston';
import genericError from '../utils/generic_error';

const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
  const accessToken: any = req.headers.authorization
    ? req.headers.authorization.split(' ')[1]
    : '';

  // Verify token validity
  jwt.verify(accessToken, accessTokenSecret, (error: any, decoded: any) => {
    if (error) {
      genericError(res, error);
    }

    // Store userData and access token inside the request
    req.userData = decoded;
    req.accessToken = accessToken;

    next();
  });
};

export default verifyAccessToken;
