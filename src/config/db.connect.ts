import * as redis from 'redis';
import * as mongoose from 'mongoose';
import Logger from './winston';
import { mongooseConfig, redisPort, redisHost } from './config';

// connection to mongoDB
mongoose.connect(mongooseConfig.dsn, mongooseConfig.options, (error) => {
  if (error) {
    Logger.error(`${error} ❌`);
    throw error;
  } else {
    Logger.info(`Database :: mongodb connection @: ${mongooseConfig.dsn} ✅`);
  }
});

// Connection to redis client
const redisClient = redis.createClient(redisPort, redisHost);

redisClient
  .on('connect', () => {
    Logger.info(`DATABASE :: redis connetion @ ${redisHost}:${redisPort} ✅`);
  })
  .on('error', (error) => {
    Logger.error(`${error} ❌`);
    throw error;
  });

export default redisClient;
