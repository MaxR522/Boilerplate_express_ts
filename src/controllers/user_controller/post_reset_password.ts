import { Request, Response } from 'express';
import User from '../../models/user';
import * as jwt from 'jsonwebtoken';
import { passwordTokenSecret, passwordTokenLimit } from '../../config/config';
import sendPasswordResetMail from '../../mailers/password_reset_mailer';

const ResetPassword = (req: Request, res: Response) => {
  const _email = req.body.email.toLowerCase();

  User.findOne({ email: _email }, async (error: any, user: any) => {
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
        message: 'user not found, maybe nor registered',
      });
    }

    const payload = { email: _email };

    const passwordResetToken = await jwt.sign(payload, passwordTokenSecret, {
      expiresIn: passwordTokenLimit,
    });

    user.passwordResetToken = passwordResetToken;
    await user.save((error: any) => {
      if (error) {
        return res.status(400).json({
          success: 'false',
          message: 'something went wrong !',
          errors: error,
        });
      }

      sendPasswordResetMail(_email, passwordResetToken);

      return res.status(200).json({
        success: 'true',
        message: `A password reset instruction have been sent to the email: ${_email}`,
        data: _email,
      });
    });
  });
};

export default ResetPassword;
