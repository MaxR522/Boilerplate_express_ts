import { Request, Response } from 'express';
import User from '../../../models/user';
import IUser from '../../../interfaces/models/user_interface';
import * as bcrypt from 'bcrypt';
import Logger from '../../../config/winston';
import genericError from '../../../utils/generic_error';

const ChangePassword = (req: Request, res: Response) => {
  const _email = req.userData.email;
  const _currentPassword = req.body.password;
  const _newPassword = req.body.newPassword;

  User.findOne({ email: _email }, (error: any, user: IUser) => {
    if (error) {
      Logger.error(error);
      genericError(res, error);
    }

    if (!user) {
      Logger.error('user not found');
      return res.status(404).json({
        success: 'false',
        message: 'user not found, maybe not registered',
      });
    }

    bcrypt.compare(
      _currentPassword,
      user.password,
      (error: any, isMatch: boolean) => {
        if (error) {
          Logger.error(error);
          genericError(res, error);
        }

        if (!isMatch) {
          return res.status(403).json({
            success: 'false',
            message: 'wrong password',
          });
        }

        if (isMatch) {
          user.password = _newPassword;

          user.save((error: any) => {
            if (error) {
              Logger.error(error);
              genericError(res, error);
            }

            return res.status(200).json({
              success: 'true',
              message: 'Your password was changed successfully',
            });
          });
        }
      },
    );
  });
};

export default ChangePassword;
