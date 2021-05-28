import { Request, Response, NextFunction } from 'express';
import User from '../models/user';

const checkUser = (req: Request, res: Response, next: NextFunction) => {
  const _email = req.userData.email;

  // check the email in playload if it is not in database
  User.findOne({ email: _email }, (error: any, user: any) => {
    if (error) {
      return res.status(400).json({
        success: 'false',
        message: 'Something went wrong',
        errors: error,
      });
    }

    if (!user) {
      return res.status(401).json({
        success: 'false',
        message: 'User not registered',
      });
    }

    next();
  });
};

export default checkUser;
