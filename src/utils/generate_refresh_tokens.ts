import * as jwt from 'jsonwebtoken';
import redis_client from '../index';
import { ObjectId } from 'mongoose';

// Method to generate and store in Redis the refresh token
const generateRefreshToken = async (
  ipAdress: string,
  user_id: ObjectId,
  payload: any,
  secret: string,
  timeLimit: string,
): Promise<string> => {
  const refresh_token = await jwt.sign(payload, secret, {
    expiresIn: timeLimit,
  });
  redis_client.get(user_id.toString(), async (err, data) => {
    if (err) throw err;

    redis_client.set(
      user_id.toString(),
      JSON.stringify({ token: refresh_token, ipAdress: ipAdress }),
    );
  });

  return refresh_token;
};

export default generateRefreshToken;
