import { Request, Response } from 'express';
import redisClient from '../../../config/db.connect';
import Logger from '../../../config/winston';
import genericError from '../../../utils/generic_error';

const RevokeRefreshToken = (req: Request, res: Response) => {
  const userId = req.userData.sub;

  redisClient.del(userId.toString(), (error, reply) => {
    if (error) {
      genericError(res, error);
    }

    Logger.warn('refresh token revoked');
    return res.status(200).json({
      success: true,
      message: 'Refresh token revoked successfully',
      data: reply,
    });
  });
};

export default RevokeRefreshToken;
