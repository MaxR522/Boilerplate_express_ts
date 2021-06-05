import { Request, Response } from 'express';
import User from '../../models/user';
import sendConfirmationEmail from '../../mailers/confirmation_mailer';
import * as jwt from 'jsonwebtoken';
import {
  confirmationTokenSecret,
  confirmationTokenLimit,
} from '../../config/config';

const ResendConfirmation = (req: Request, res: Response) => {
  const _email = req.body.email.toLowerCase();

  if (_email) {
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
          message: 'User not registered',
        });
      }

      if (user) {
        const newConfirmationToken = await jwt.sign(
          { email: _email },
          confirmationTokenSecret,
          { expiresIn: confirmationTokenLimit },
        );

        user.confirmationToken = newConfirmationToken;
        user.confirmationSentAt = new Date();
        user.save((error: any) => {
          if (error) {
            return res.status(400).json({
              success: 'false',
              message: 'something went wrong !',
              errors: error,
            });
          }

          sendConfirmationEmail('', _email, newConfirmationToken);

          return res.status(200).json({
            success: 'true',
            message: `A new confirmation email has been sent to: ${_email}`,
            data: _email,
          });
        });
      }
    });
  } else {
    return res.status(400).json({
      success: 'false',
      message: 'email not provided',
    });
  }
};

export default ResendConfirmation;
