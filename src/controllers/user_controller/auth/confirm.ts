import { Request, Response } from 'express';
import User from '../../../models/user';
import { redirectUrlConfirmation } from '../../../config/config';
import Logger from '../../../config/winston';
import genericError from '../../../utils/generic_error';

const Confirm = (req: Request, res: Response) => {
  const _email = req.userData.email;
  User.findOne({ email: _email }, (error: any, user: any) => {
    if (error) {
      genericError(res, error);
    }

    user.confirmationToken = '';
    user.confirmedAt = new Date();

    user.save((error: any) => {
      if (error) {
        genericError(res, error);
      }

      return res.status(200).redirect(301, redirectUrlConfirmation);
    });
  });
};

export default Confirm;
