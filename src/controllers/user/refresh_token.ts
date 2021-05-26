import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { accessTokenSecret, accessTokenLimit } from '../../config/config';
import User from '../../models/user';

const NewTokens = (req: Request, res: Response) => {
  try {
    const refresh_token = req.body.token;
    const decoded = refresh_token
      ? jwt.decode(refresh_token, { complete: true })
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
              data: error,
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

          const access_token = jwt.sign(playload, accessTokenSecret, {
            expiresIn: accessTokenLimit,
          });

          return res.status(200).json({
            success: 'true',
            message: 'new tokens generated',
            access_token,
          });
        },
      );
    }
  } catch (error) {
    return res.status(400).json({
      success: 'false',
      message: 'something went wrong',
      data: error,
    });
  }
};

export default NewTokens;
