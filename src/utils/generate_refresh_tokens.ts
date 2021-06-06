import * as jwt from 'jsonwebtoken';
import redisClient from '../index';
import { ObjectId } from 'mongoose';

// Method to generate and store in Redis the refresh token
const generateRefreshToken = async (
  ipAdress: string,
  userId: ObjectId,
  payload: any,
  secret: string,
  timeLimit: string,
): Promise<string> => {
  const refreshToken = await jwt.sign(payload, secret, {
    expiresIn: timeLimit,
  });
  redisClient.get(userId.toString(), async (error: any, data: any) => {
    if (error) throw error;

    redisClient.set(
      userId.toString(),
      JSON.stringify({ token: refreshToken, ipAdress: ipAdress }),
    );
  });

  return refreshToken;
};

export default generateRefreshToken;
