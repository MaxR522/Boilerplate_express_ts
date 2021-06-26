import * as rateLimit from 'express-rate-limit';
import { maxRequest, windowMs } from '../config/config';
import { Request, Response } from 'express';
import Logger from '../config/winston';
import * as RedisStore from 'rate-limit-redis';
import redisClient from '../config/db.connect';

// What to do when our maximum request rate is breached
const limitReached = (req: Request, res: Response) => {
  Logger.warn(`IP::${req.ip} hit the max request limit`);
  return res.status(429).json({
    success: 'false',
    message: `Too many requests from this IP::${req.ip}, please try again after ${windowMs} minutes`,
  });
}; // Options for our rate limiter

const options: rateLimit.Options = {
  store: new RedisStore({
    client: redisClient,
    expiry: windowMs * 60,
  }),
  max: maxRequest,
  onLimitReached: limitReached, // called once when max is reached
  handler: limitReached, // called for each subsequent request once max is reached
};

const limiter = rateLimit(options);

export default limiter;
