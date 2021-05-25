import * as jwt from 'jsonwebtoken';
import redis_client from '../index';
import { ObjectId } from 'mongoose';

// Method to generate and store in Redis the refresh token
const generateRefreshToken = (
  user_id: ObjectId,
  playload: any,
  secret: string,
  timeLimit: string,
) => {
  const refresh_token = jwt.sign(playload, secret, { expiresIn: timeLimit });

  redis_client.get(user_id.toString(), (err, data) => {
    if (err) throw err;

    redis_client.set(
      user_id.toString(),
      JSON.stringify({ token: refresh_token }),
    );
  });

  return refresh_token;
};

export default generateRefreshToken;
