import { Request, Response } from 'express';
import User from '../../../models/user';
import * as jwt from 'jsonwebtoken';
import {
  passwordTokenSecret,
  passwordTokenLimit,
} from '../../../config/config';
import sendPasswordResetMail from '../../../mailers/password_reset_mailer';
import Logger from '../../../config/winston';
import genericError from '../../../utils/generic_error';
import notFoundError from '../../../utils/not_found_error';

const ResetPassword = (req: Request, res: Response) => {
  const _email = req.body.email.toLowerCase();

  User.findOne({ email: _email }, async (error: any, user: any) => {
    if (error) {
      genericError(res, error);
    }

    if (!user) {
      notFoundError(res);
    }

    const payload = { email: _email };

    const passwordResetToken = await jwt.sign(payload, passwordTokenSecret, {
      expiresIn: passwordTokenLimit,
    });

    user.passwordResetToken = passwordResetToken;
    await user.save((error: any) => {
      if (error) {
        genericError(res, error);
      }

      sendPasswordResetMail(_email, passwordResetToken);

      return res.status(200).json({
        success: true,
        message: `A password reset instruction have been sent to the email: ${_email}`,
        data: { email: _email },
      });
    });
  });
};

export default ResetPassword;
