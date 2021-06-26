import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { accessTokenSecret, accessTokenLimit } from '../../../config/config';
import Logger from '../../../config/winston';
import genericError from '../../../utils/generic_error';

const NewToken = async (req: Request, res: Response) => {
  try {
    const user = req.userData;

    const playload = {
      sub: user.sub,
      email: user.email,
      role: user.role,
    };

    const accessToken = await jwt.sign(playload, accessTokenSecret, {
      expiresIn: accessTokenLimit,
    });

    return res.status(200).json({
      success: true,
      message: 'new tokens generated',
      accessToken,
    });
  } catch (error) {
    genericError(res, error);
  }
};

export default NewToken;
