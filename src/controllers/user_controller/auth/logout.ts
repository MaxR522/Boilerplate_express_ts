import { Request, Response } from 'express';
import redisClient from '../../../config/db.connect';
import { ttlAccessToken } from '../../../config/config';
import Logger from '../../../config/winston';
import genericError from '../../../utils/generic_error';

const Logout = async (req: Request, res: Response) => {
  const accessToken = req.accessToken;
  const decoded = req.userData;

  const userId = decoded?.sub;

  // Blacklist access token
  if (accessToken) {
    await redisClient.set(
      `BL_${userId}`,
      accessToken.toString(),
      'EX',
      ttlAccessToken * 60,
      (error) => {
        if (error) {
          Logger.error(error);
          genericError(res, error);
        }

        Logger.warn('Token blacklisted');
      },
    );

    // respond a success message if no error
    return res.status(200).json({
      success: true,
      message: 'user logged out',
    });
  }
};

export default Logout;
