import { Request, Response } from 'express';
import User from '../../../models/user';
import sendConfirmationEmail from '../../../mailers/confirmation_mailer';
import * as jwt from 'jsonwebtoken';
import {
  confirmationTokenSecret,
  confirmationTokenLimit,
} from '../../../config/config';
import Logger from '../../../config/winston';
import genericError from '../../../utils/generic_error';

const ResendConfirmation = (req: Request, res: Response) => {
  const _email = req.body.email.toLowerCase();

  User.findOne({ email: _email }, async (error: any, user: any) => {
    if (error) {
      Logger.error(error);
      genericError(res, error);
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'user not found, maybe not registered',
      });
    }

    if (user.confirmedAt) {
      return res.status(409).json({
        success: false,
        message: 'Your account is already confirmed',
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
          Logger.error(error);
          genericError(res, error);
        }

        sendConfirmationEmail('', _email, newConfirmationToken);

        return res.status(200).json({
          success: true,
          message: `A new confirmation email has been sent to: ${_email}`,
          data: { email: _email },
        });
      });
    }
  });
};

export default ResendConfirmation;
