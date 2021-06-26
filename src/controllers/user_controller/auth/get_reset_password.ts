import { Request, Response } from 'express';
import User from '../../../models/user';
import redisClient from '../../../config/db.connect';
import {
  ttlResetPassword,
  redirectUrlPasswordReset,
} from '../../../config/config';
import Logger from '../../../config/winston';
import genericError from '../../../utils/generic_error';

const GetResetPassword = (req: Request, res: Response) => {
  const _email = req.userData.email;
  User.findOne({ email: _email }, async (error: any, user: any) => {
    if (error) {
      genericError(res, error);
    }

    await redisClient.set(
      `PR_${_email}`,
      JSON.stringify({ allowPasswordChange: true }),
      'EX',
      ttlResetPassword * 60,
      (error: any) => {
        if (error) {
          genericError(res, error);
        }
      },
    );

    user.passwordResetToken = '';
    user.passwordResetAt = new Date();

    user.save((error: any) => {
      if (error) {
        genericError(res, error);
      }

      // Add inside query param the email of the user to find the current user.
      // the client will send it back as param when modify password
      return res
        .status(200)
        .redirect(
          301,
          `${redirectUrlPasswordReset}?allow_password_reset=true&email=${_email}`,
        );
    });
  });
};

export default GetResetPassword;
