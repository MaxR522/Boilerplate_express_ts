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
import redis_client from '../../index';

const Login = async (req: Request, res: Response) => {
  const _email = req.body.email.toLowerCase();
  const _password = req.body.password;

  const user = await User.findOne({ email: _email }, (err: any) => {
    if (err) {
      return res.status(400).json({
        success: 'false',
        message: 'something went wrong',
        error: err,
      });
    }
  });

  if (!user) {
    return res.status(404).json({
      success: 'false',
      message: 'user not found',
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
      async (err: any, isMatch: boolean) => {
        if (err) {
          return res.status(400).json({
            success: 'false',
            message: 'something went wrong',
            error: err,
          });
        }

        // If the req password doesn't match with hashed password in database
        if (!isMatch) {
          return res.status(401).json({
            success: 'false',
            message: 'Wrong email or password',
          });
        }

        // define playload inside jwt tokens
        const payload = {
          sub: user._id,
          email: user.email,
          role: user.role,
        };

        // Generate access and refresh tokens if no error and password matched
        const access_token = await jwt.sign(payload, accessTokenSecret, {
          expiresIn: accessTokenLimit,
        });

        // Verify in redis db if there is already a refresh token generated
        // Refresh token doesn't change until the user revoke it

        redis_client.get(user._id.toString(), async (err, data) => {
          if (err) throw err;

          if (data === null) {
            const refresh_token = await generateRefreshToken(
              req.ip,
              user._id,
              payload,
              refreshTokenSecret,
              refreshTokenLimit,
            );

            return res.status(200).json({
              success: 'true',
              message: 'User logged in successfully',
              data: user,
              tokens: {
                access_token,
                refresh_token,
              },
            });
          } else if (JSON.parse(data).token) {
            const refresh_token = await JSON.parse(data).token;

            return res.status(200).json({
              success: 'true',
              message: 'User logged in successfully',
              data: user,
              tokens: {
                access_token,
                refresh_token,
              },
            });
          }
        });
      },
    );
  }
};

export default Login;
