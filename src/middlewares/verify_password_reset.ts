import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { passwordTokenSecret } from '../config/config';
import User from '../models/user';

const verifyPasswordResetToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const passwordResetToken = req.params.passwordResetToken;
  jwt.verify(
    passwordResetToken,
    passwordTokenSecret,
    (error: any, decoded: any) => {
      if (error) {
        return res.status(400).json({
          success: 'false',
          message: 'something went wrong !',
          errors: error,
        });
      }

      if (decoded) {
        User.findOne({ email: decoded.email }, (error: any, user: any) => {
          if (error) {
            return res.status(400).json({
              success: 'false',
              message: 'something went wrong !',
              errors: error,
            });
          }

          if (!user) {
            return res.status(404).json({
              success: 'false',
              message: 'user not found, please register again',
            });
          }

          if (user.passwordResetToken !== passwordResetToken) {
            return res.status(400).json({
              success: 'false',
              message: 'Invalid password reset token',
            });
          }

          req.passwordResetToken = passwordResetToken;
          req.userData = decoded;
          next();
        });
      }
    },
  );
};

export default verifyPasswordResetToken;
