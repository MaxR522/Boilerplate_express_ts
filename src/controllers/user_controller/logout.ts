import { Request, Response } from 'express';
import redisClient from '../../index';
import { ttlAccessToken } from '../../config/config';

const Logout = async (req: Request, res: Response) => {
  try {
    const accessToken = req.accessToken;
    const decoded = req.userData;

    if (accessToken && decoded) {
      const userId = decoded.sub;

      // Blacklist access token
      await redisClient.set(
        `BL_${userId}`,
        accessToken.toString(),
        'EX',
        ttlAccessToken * 60,
        (error) => {
          if (error) {
            return res.status(400).json({
              success: 'false',
              message: 'something went wrong',
              errors: error,
            });
          }
        },
      );

      // respond a success message if no error
      return res.status(200).json({
        success: 'true',
        message: 'user logged out',
      });
    } else {
      return res.status(400).json({
        success: 'false',
        message: 'No token provided',
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: 'false',
      message: 'something went wrong',
      errors: error,
    });
  }
};

export default Logout;
