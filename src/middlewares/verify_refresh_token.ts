import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { refreshTokenSecret } from '../config/config';
import redisClient from '../index';

const verifyRefreshToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const refreshToken = req.body.token;

  // Verify refresh token validity
  jwt.verify(
    refreshToken,
    refreshTokenSecret,
    async (error: any, decoded: any) => {
      if (error) {
        return res.status(401).json({
          success: 'false',
          message: 'Something went wrong',
          errors: error,
        });
      }

      // Compare refresh_token with the stored in redis
      await redisClient.get(decoded.sub.toString(), (error, data) => {
        if (error) {
          return res.status(400).json({
            success: 'false',
            message: 'Something went wrong',
            errors: error,
          });
        }

        // If token inside redis is empty that's mean the user is logged out
        if (data === null) {
          return res.status(401).json({
            success: 'false',
            message: 'Logged out, try to login',
          });
        }

        // If token inside redis is different that's mean the user generated new refresh token by login
        if (JSON.parse(data).token !== refreshToken) {
          return res.status(401).json({
            success: 'false',
            message: 'Wrong token, please login',
          });
        }

        req.userData = decoded;
        req.refreshToken = refreshToken;
        next();
      });
    },
  );
};

export default verifyRefreshToken;
