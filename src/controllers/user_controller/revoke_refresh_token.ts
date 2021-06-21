import { Request, Response } from 'express';
import redisClient from '../../index';
import Logger from '../../config/winston';

const RevokeRefreshToken = (req: Request, res: Response) => {
  const userId = req.userData.sub;

  redisClient.del(userId.toString(), (error, reply) => {
    if (error) {
      Logger.error(error);
      return res.status(400).json({
        success: 'false',
        message: 'something went wrong',
        errors: error,
      });
    }

    Logger.warn('refresh token revoked');
    return res.status(200).json({
      success: 'true',
      message: 'Refresh token revoked successfully',
      data: reply,
    });
  });
};

export default RevokeRefreshToken;
