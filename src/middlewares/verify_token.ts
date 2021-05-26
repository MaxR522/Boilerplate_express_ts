import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { accessTokenSecret } from '../config/config';
import User from '../models/user';

const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const access_token: any = req.headers.authorization
      ? req.headers.authorization.split(' ')[1]
      : '';

    // Verify token validity
    jwt.verify(access_token, accessTokenSecret, (error: any, decoded: any) => {
      if (error) {
        return res.status(400).json({
          success: 'false',
          message: 'Something went wrong',
          data: error,
        });
      }

      // check the email in playload if it is not in database
      User.findOne({ email: decoded.email }, (error: any, user: any) => {
        if (error) {
          return res.status(400).json({
            success: 'false',
            message: 'Something went wrong',
            data: error,
          });
        }

        if (!user) {
          return res.status(401).json({
            success: 'false',
            message: 'User not found',
          });
        }
      });
      next();
    });
  } catch (error) {
    return res.status(401).json({
      success: 'false',
      message: 'Invalid session',
      data: error,
    });
  }
};

export default verifyAccessToken;
