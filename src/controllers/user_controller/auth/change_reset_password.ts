import { Request, Response } from 'express';
import redisClient from '../../../index';
import User from '../../../models/user';
import IUser from '../../../interfaces/models/user_interface';
import Logger from '../../../config/winston';

const ChangeResetedPassword = (req: Request, res: Response) => {
  const _email = req.body.email;
  const _newPassword = req.body.newPassword;

  redisClient.get(`PR_${_email}`, (error: any, data: any) => {
    if (error) {
      Logger.error(error);
      return res.status(400).json({
        success: 'false',
        message: 'Something went wrong #1',
        errors: error,
      });
    }

    if (!data) {
      return res.status(403).json({
        success: 'false',
        message:
          'You are not allowed to perform this action, try to make new request again',
      });
    }

    User.findOne({ email: _email }, async (error: any, user: IUser) => {
      if (error) {
        Logger.error(error);
        return res.status(400).json({
          success: 'false',
          message: 'Something went wrong',
          errors: error,
        });
      }

      if (!user) {
        return res.status(404).json({
          success: 'false',
          message: 'User not found, maybe not registered',
        });
      }

      user.password = _newPassword;

      await user.save((error: any) => {
        if (error) {
          Logger.error(error);
          return res.status(400).json({
            success: 'false',
            message: 'Something went wrong #2',
            errors: error,
          });
        }

        return res.status(200).json({
          success: 'true',
          message: 'Your password was changed successfully',
        });
      });
    });
  });
};

export default ChangeResetedPassword;
