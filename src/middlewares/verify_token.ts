import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { accessTokenSecret } from '../config/config';

const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken: any = req.headers.authorization
      ? req.headers.authorization.split(' ')[1]
      : '';

    // Verify token validity
    jwt.verify(accessToken, accessTokenSecret, (error: any, decoded: any) => {
      if (error) {
        return res.status(400).json({
          success: 'false',
          message: 'Something went wrong',
          errors: error,
        });
      }

      // Store userData and access token inside the request
      req.userData = decoded;
      req.accessToken = accessToken;

      next();
    });
  } catch (error) {
    return res.status(401).json({
      success: 'false',
      message: 'Invalid session',
      errors: error,
    });
  }
};

export default verifyAccessToken;
