import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { refreshTokenSecret } from '../config/config';
import redis_client from '../index';
import User from '../models/user';

const verifyRefreshToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const refresh_token = req.body.token;

    // Verify refresh token validity
    jwt.verify(
      refresh_token,
      refreshTokenSecret,
      (error: any, decoded: any) => {
        if (error) throw error;

        // Compare refresh_token with the stored in redis
        redis_client.get(decoded.sub.toString(), (error, data) => {
          if (error) throw error;

          // If token inside redis is empty that's mean the user is logged out
          if (data === null) {
            return res.status(401).json({
              success: 'false',
              message: 'Logged out, try to login',
            });
          }

          // If token inside redis is different that's mean the user generated new refresh token by login
          if (JSON.parse(data).token !== refresh_token) {
            return res.status(401).json({
              success: 'false',
              message: 'Wrong token, please login',
            });
          }

          next();
        });
      },
    );
  } catch (error) {
    return res.status(401).json({
      success: 'false',
      message: 'You are not allowed to do this action',
      data: error,
    });
  }
};

export default verifyRefreshToken;
