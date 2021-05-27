import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { accessTokenSecret, accessTokenLimit } from '../../config/config';
import User from '../../models/user';

const NewTokens = (req: Request, res: Response) => {
  try {
    const refreshToken = req.body.token;
    const decoded = refreshToken
      ? jwt.decode(refreshToken, { complete: true })
      : '';

    if (decoded) {
      // check the email in playload if it is not in database
      User.findOne(
        { email: decoded.payload.email },
        (error: any, user: any) => {
          if (error) {
            return res.status(400).json({
              success: 'false',
              message: 'Something went wrong',
              errors: error,
            });
          }

          if (user === null) {
            return res.status(401).json({
              success: 'false',
              message: 'User not found',
            });
          }

          const playload = {
            sub: user.sub,
            email: user.email,
            role: user.role,
          };

          const accessToken = jwt.sign(playload, accessTokenSecret, {
            expiresIn: accessTokenLimit,
          });

          return res.status(200).json({
            success: 'true',
            message: 'new tokens generated',
            accessToken,
          });
        },
      );
    }
  } catch (error) {
    return res.status(400).json({
      success: 'false',
      message: 'something went wrong',
      errors: error,
    });
  }
};

export default NewTokens;
