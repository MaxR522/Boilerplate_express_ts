import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { confirmationTokenSecret } from '../config/config';
import User from '../models/user';
import genericError from '../utils/generic_error';

const verifyConfirmationToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const confirmationToken = req.params.confirmationToken;

  jwt.verify(
    confirmationToken,
    confirmationTokenSecret,
    (error: any, decoded: any) => {
      if (error) {
        genericError(res, error);
      }

      if (decoded) {
        User.findOne({ email: decoded.email }, (error: any, user: any) => {
          if (error) {
            genericError(res, error);
          }

          if (!user) {
            return res.status(404).json({
              success: false,
              message: 'user not found, please register again',
            });
          }

          if (user.confirmationToken !== confirmationToken) {
            return res.status(400).json({
              success: false,
              message: 'Invalid confirmation token',
            });
          }

          req.confirmationToken = confirmationToken;
          req.userData = decoded;
          next();
        });
      }
    },
  );
};

export default verifyConfirmationToken;
