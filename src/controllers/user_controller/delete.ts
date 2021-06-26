import { Request, Response } from 'express';
import User from '../../models/user';
import IUser from '../../interfaces/models/user_interface';
import Logger from '../../config/winston';
import * as bcrypt from 'bcrypt';
import redisClient from '../../config/db.connect';
import genericError from '../../utils/generic_error';
import notFoundError from '../../utils/not_found_error';

const DeleteUser = (req: Request, res: Response) => {
  const _id = req.params.id;
  const _password = req.body.password;

  User.findOne({ _id: _id }, (error: any, user: IUser) => {
    if (error) {
      genericError(res, error);
    }

    if (!user) {
      notFoundError(res);
    }

    bcrypt.compare(_password, user.password, (error: any, isMatch: boolean) => {
      if (error) {
        genericError(res, error);
      }

      if (!isMatch) {
        return res.status(403).json({
          success: false,
          message: 'wrong password',
        });
      }

      try {
        user.remove();
        // remove the refresh token stored
        redisClient.del(user._id.toString());

        Logger.warn(`${user.email} deleted`);
        return res.status(200).json({
          success: true,
          message: 'user deleted with success',
          data: user,
        });
      } catch (error) {
        genericError(res, error);
      }
    });
  });
};

export default DeleteUser;
