import { Request, Response } from 'express';
import User from '../../models/user';
import IUser from '../../interfaces/models/user_interface';
import genericError from '../../utils/generic_error';
import notFoundError from '../../utils/not_found_error';

const ShowOneUser = (req: Request, res: Response) => {
  const _id = req.params.id;

  User.findOne({ _id: _id }, (error: any, user: IUser) => {
    if (error) {
      genericError(res, error);
    }

    if (!user) {
      notFoundError(res);
    }

    if (user) {
      const userData = {
        _id: user._id,
        fullname: user.fullname,
        dateOfBirth: user.dateOfBirth,
        role: user.role,
        email: user.email,
        picture: user.picture,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      return res.status(200).json({
        success: true,
        data: userData,
      });
    }
  });
};

export default ShowOneUser;
