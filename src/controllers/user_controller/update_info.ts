import { Request, Response } from 'express';
import User from '../../models/user';
import IUser from '../../interfaces/models/user_interface';
import genericError from '../../utils/generic_error';
import notFoundError from '../../utils/not_found_error';

const UpdateInfo = (req: Request, res: Response) => {
  const _id = req.params.id;
  const _newFullName = req.body.fullname;
  const _newDateOfBirth = req.body.dateOfBirth;

  User.findOne({ _id: _id }, (error: any, user: IUser) => {
    if (error) {
      genericError(res, error);
    }

    if (!user) {
      notFoundError(res);
    }

    user.fullname = _newFullName || user.fullname;
    user.dateOfBirth = _newDateOfBirth || user.dateOfBirth;

    user.save((error: any) => {
      if (error) {
        genericError(res, error);
      }

      const userData = {
        _id: user._id,
        fullname: user.fullname,
        dateOfBirth: user.dateOfBirth,
        email: user.email,
      };

      return res.status(200).json({
        success: true,
        message: 'user updated successfully',
        data: userData,
      });
    });
  });
};

export default UpdateInfo;
