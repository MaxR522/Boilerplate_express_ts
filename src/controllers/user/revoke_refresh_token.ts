import { Request, Response } from 'express';
import redisClient from '../../index';

const RevokeRefreshToken = (req: Request, res: Response) => {
  const userId = req.userData.sub;

  console.log('Tonga ato ve ?');

  try {
    redisClient.del(userId.toString(), (error, reply) => {
      if (error) {
        return res.status(400).json({
          success: 'false',
          message: 'something went wrong',
          errors: error,
        });
      }

      return res.status(200).json({
        success: 'true',
        message: 'Refresh token revoked successfully',
        data: reply,
      });
    });
  } catch (error) {
    return res.status(400).json({
      success: 'false',
      message: 'something went wrong',
      errors: error,
    });
  }
};

export default RevokeRefreshToken;