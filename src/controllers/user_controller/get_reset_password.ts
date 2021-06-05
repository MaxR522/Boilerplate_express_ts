import { Request, Response } from 'express';
import User from '../../models/user';
import redisClient from '../../index';
import { ttlResetPassword } from '../../config/config';

const GetResetPassword = (req: Request, res: Response) => {
  const _email = req.userData.email;
  User.findOne({ email: _email }, async (error: any, user: any) => {
    if (error) {
      return res.status(400).json({
        success: 'false',
        message: 'something ent wrong !',
        errors: error,
      });
    }

    await redisClient.set(
      `PR_${_email}`,
      JSON.stringify({ allowPasswordChange: true }),
      'EX',
      ttlResetPassword * 60,
      (error: any) => {
        if (error) {
          return res.status(400).json({
            success: 'false',
            message: 'something ent wrong !',
            errors: error,
          });
        }
      },
    );

    user.passwordResetToken = '';
    user.passwordResetedAt = new Date();

    user.save((error: any) => {
      if (error) {
        return res.status(400).json({
          success: 'false',
          message: 'something ent wrong !',
          errors: error,
        });
      }

      return res
        .status(200)
        .redirect(301, 'https://github.com/NodeRedis/node-redis');
    });
  });
};

export default GetResetPassword;
