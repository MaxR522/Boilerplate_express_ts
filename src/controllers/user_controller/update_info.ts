import { Request, Response } from 'express';
import User from '../../models/user';
import IUser from '../../interfaces/models/user_interface';
import Logger from '../../config/winston';

const UpdateInfo = (req: Request, res: Response) => {
  const _email = req.userData.email;
  const _newFullName = req.body.fullname;
  const _newDateOfBirth = req.body.dateOfBirth;

  User.findOne({ email: _email }, (error: any, user: IUser) => {
    if (error) {
      Logger.error(error);
      return res.status(400).json({
        success: 'false',
        message: 'something went wrong !',
        errors: error,
      });
    }

    if (!user) {
      Logger.error('user not found');
      return res.status(404).json({
        success: 'false',
        message: 'User not found, maybe not registered',
      });
    }

    user.fullname = _newFullName || user.fullname;
    user.dateOfBirth = _newDateOfBirth || user.dateOfBirth;

    user.save((error: any) => {
      if (error) {
        Logger.error(error);
        return res.status(400).json({
          success: 'false',
          message: 'something went wrong !',
          errors: error,
        });
      }

      const userData = {
        _id: user._id,
        fullname: user.fullname,
        dateOfBirth: user.dateOfBirth,
        email: user.email,
      };

      return res.status(200).json({
        success: 'true',
        message: 'user updated successfully',
        data: userData,
      });
    });
  });
};

export default UpdateInfo;
