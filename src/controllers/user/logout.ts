import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import redisClient from '../../index';

const Logout = async (req: Request, res: Response) => {
  try {
    const accessToken = req.headers.authorization
      ? await req.headers.authorization.split(' ')[1]
      : null;

    const decoded = accessToken ? await jwt.decode(accessToken) : null;

    if (accessToken && decoded) {
      const userId = decoded.sub;

      // Blacklist access token during 60 minutes
      await redisClient.set(
        `BL_${userId}`,
        accessToken.toString(),
        'EX',
        60 * 60,
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
