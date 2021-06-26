import { Request, Response } from 'express';
import redisClient from '../../../config/db.connect';
import User from '../../../models/user';
import IUser from '../../../interfaces/models/user_interface';
import Logger from '../../../config/winston';
import genericError from '../../../utils/generic_error';
import notFoundError from '../../../utils/not_found_error';

const ChangeResetedPassword = (req: Request, res: Response) => {
  const _email = req.body.email;
  const _newPassword = req.body.newPassword;

  redisClient.get(`PR_${_email}`, (error: any, data: any) => {
    if (error) {
      genericError(res, error);
    }

    if (!data) {
      return res.status(403).json({
        success: false,
        message:
          'You are not allowed to perform this action, try to make new request again',
      });
    }

    User.findOne({ email: _email }, async (error: any, user: IUser) => {
      if (error) {
        genericError(res, error);
      }

      if (!user) {
        notFoundError(res);
      }

      user.password = _newPassword;

      await user.save((error: any) => {
        if (error) {
          genericError(res, error);
        }

        return res.status(200).json({
          success: true,
          message: 'Your password was changed successfully',
        });
      });
    });
  });
};

export default ChangeResetedPassword;
