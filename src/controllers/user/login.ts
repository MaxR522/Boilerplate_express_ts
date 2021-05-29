import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import User from '../../models/user';
import {
  accessTokenSecret,
  refreshTokenSecret,
  accessTokenLimit,
  refreshTokenLimit,
} from '../../config/config';
import generateRefreshToken from '../../utils/generate_refresh_tokens';
import redisClient from '../../index';

const Login = async (req: Request, res: Response) => {
  const _email = req.body.email.toLowerCase();
  const _password = req.body.password;

  const user = await User.findOne({ email: _email }, (error: any) => {
    if (error) {
      return res.status(400).json({
        success: 'false',
        message: 'something went wrong',
        errors: error,
      });
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
          return res.status(400).json({
            success: 'false',
            message: 'something went wrong',
            errors: error,
          });
        }

        // If the req password doesn't match with hashed password in database
        if (!isMatch) {
          return res.status(401).json({
            success: 'false',
            message: 'Wrong email or password',
          });
        }

        // Confirmation
        if (!user.confirmedAt) {
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

        // Verify in redis db if there is already a refresh token generated
        // Refresh token doesn't change until the user revoke it

        redisClient.get(user._id.toString(), async (error, data) => {
          if (error) throw error;

          if (data === null) {
            const refreshToken = await generateRefreshToken(
              req.ip,
              user._id,
              payload,
              refreshTokenSecret,
              refreshTokenLimit,
            );

            return (
              res
                .status(200)
                // .cookie('refresh_token', refreshToken, {
                //   expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // <-- 30 days
                //   secure: false, // set to true if your using https
                //   httpOnly: true,
                // })
                .json({
                  success: 'true',
                  message: 'User logged in successfully',
                  data: user,
                  tokens: {
                    accessToken,
                    refreshToken,
                  },
                })
            );
          } else if (JSON.parse(data).token) {
            const refreshToken = await JSON.parse(data).token;

            return (
              res
                .status(200)
                // .cookie('refresh_token', refreshToken, {
                //   expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // <-- 30 days
                //   secure: false, // set to true if your using https
                //   httpOnly: true,
                // })
                .json({
                  success: 'true',
                  message: 'User logged in successfully',
                  data: user,
                  tokens: {
                    accessToken,
                    refreshToken,
                  },
                })
            );
          }
        });
      },
    );
  }
};

export default Login;
