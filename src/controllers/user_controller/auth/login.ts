import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import User from '../../../models/user';
import {
  accessTokenSecret,
  refreshTokenSecret,
  accessTokenLimit,
  refreshTokenLimit,
  ttlAttemptLogin,
} from '../../../config/config';
import generateRefreshToken from '../../../utils/generate_refresh_tokens';
import redisClient from '../../../config/db.connect';
import Logger from '../../../config/winston';
import genericError from '../../../utils/generic_error';

const Login = async (req: Request, res: Response) => {
  const _email = req.body.email.toLowerCase();
  const _password = req.body.password;

  const user = await User.findOne({ email: _email }, (error: any) => {
    if (error) {
      Logger.error(error);
      genericError(res, error);
    }
  });

  if (!user) {
    return res.status(404).json({
      success: 'false',
      message: 'user not found, maybe not registered',
    });
  }

  // Empty password means user use Oauth
  if (!user.password) {
    return res.status(409).json({
      success: 'false',
      message: 'Please login using your social creds',
    });
  }

  if (user) {
    // Compare the request password with user hashed password
    bcrypt.compare(
      _password,
      user.password,
      async (error: any, isMatch: boolean) => {
        if (error) {
          Logger.error(error);
          genericError(res, error);
        }

        // If the req password doesn't match with hashed password in database
        if (!isMatch) {
          Logger.error('Wrong password');
          // increment value of attempt when password not matching
          redisClient.incr(`AL_${_email}`, (error: any) => {
            if (error) {
              Logger.error(error);
              genericError(res, error);
            }
            redisClient.expire(`AL_${_email}`, ttlAttemptLogin * 60);
          });

          return res.status(401).json({
            success: 'false',
            message: 'Wrong email or password',
          });
        }

        Logger.info('valid user password');

        // Confirmation
        if (!user.confirmedAt) {
          Logger.error("User's email not confirmed");
          return res.status(401).json({
            success: 'false',
            message: 'email not confirmed',
          });
        }

        // define playload inside jwt tokens
        const payload = {
          sub: user._id,
          email: user.email,
          role: user.role,
        };

        // Generate access and refresh tokens if no error and password matched
        const accessToken = await jwt.sign(payload, accessTokenSecret, {
          expiresIn: accessTokenLimit,
        });

        Logger.info('Access-token generated');

        // Verify in redis db if there is already a refresh token generated
        // Refresh token doesn't change until the user revoke it
        const userData = {
          _id: user._id,
          fullname: user.fullname,
          dateOfBirth: user.dateOfBirth,
          email: user.email,
          role: user.role,
          picture: user.picture,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };

        redisClient.get(user._id.toString(), async (error, data) => {
          if (error) {
            Logger.error(error);
            genericError(res, error);
          }

          if (data === null) {
            const refreshToken = await generateRefreshToken(
              req.ip,
              user._id,
              payload,
              refreshTokenSecret,
              refreshTokenLimit,
            );
            Logger.info('Refresh-token generated');

            return res
              .status(200)
              .cookie('refresh_token', refreshToken, {
                expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // <-- 30 days inside cookies
                secure: false, // set to true if your using https
                httpOnly: true,
              })
              .json({
                success: 'true',
                message: 'User logged in successfully',
                data: userData,
                tokens: {
                  accessToken,
                },
              });
          } else if (JSON.parse(data).token) {
            const refreshToken = await JSON.parse(data).token;
            Logger.info('Refresh-token served');

            return res
              .status(200)
              .cookie('refresh_token', refreshToken, {
                expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // <-- 30 days
                secure: false, // set to true if your using https
                httpOnly: true,
              })
              .json({
                success: 'true',
                message: 'User logged in successfully',
                data: userData,
                tokens: {
                  accessToken,
                },
              });
          }
        });
      },
    );
  }
};

export default Login;
