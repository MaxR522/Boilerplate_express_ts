import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import genericError from '../utils/generic_error';
import notFoundError from '../utils/not_found_error';

const checkUser = (req: Request, res: Response, next: NextFunction) => {
  const _email = req.userData.email;

  // check the email in playload if it is not in database
  User.findOne({ email: _email }, (error: any, user: any) => {
    if (error) {
      genericError(res, error);
    }

    if (!user) {
      notFoundError(res, 401);
    }

    next();
  });
};

export default checkUser;
