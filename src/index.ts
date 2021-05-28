/*********************************************************************
 *                                                                   *
 *      @author Mario Randrianomearisoa <ranjamario@gmail.com>       *
 *                                                                   *
 *                         BOOTSTRAP YOUR APP                        *
 *                                                                   *
 *********************************************************************/
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as redis from 'redis';
import * as cors from 'cors';
import {
  mongooseConfig,
  port,
  maxUploadLimit,
  corsOption,
  redisHost,
  redisPort,
} from './config/config';

import apiRoute from './routes/api';

const app = express();

/*****************************************************
 *
 *  Middlewares
 *
 *****************************************************/

// Body parser
app.use(express.json({ limit: maxUploadLimit }));
app.use(express.urlencoded({ extended: true, limit: maxUploadLimit }));

// cross-origin
app.use(cors(corsOption));

// Disable x-powered-by header
app.disable('x-powered-by');

// Enable trust proxy
app.enable('trust proxy');

/*****************************************************
 *
 *  Define all Routes
 *
 *****************************************************/
// app.use(flash());

app.get('/', (req, res) => {
  res.send('well done');
});

app.use('/api', apiRoute);

/******************************************************
 *
 * Database connection
 *
 ******************************************************/

// connection to mongoDB
mongoose.connect(mongooseConfig.dsn, mongooseConfig.options, (error) => {
  if (error) {
    console.log(`${error} ❌`);
    throw error;
  } else {
    console.log(`Database :: mongodb connection @: ${mongooseConfig.dsn} ✅`);
  }
});

// Connection to redis client
const redisClient = redis.createClient(redisPort, redisHost);

redisClient
  .on('connect', () => {
    console.log(`DATABASE :: redis connetion @ ${redisHost}:${redisPort} ✅`);
  })
  .on('error', (error) => {
    console.log(`${error} ❌`);
    throw error;
  });

export default redisClient;

/******************************************************
 *
 * Listen to Port
 *
 ******************************************************/

app
  .listen(port, '0.0.0.0', () => {
    console.log(
      `Server :: application is running @ 'http://localhost:${port}' ! 🎉 `,
    );
  })
  .on('error', (error) => {
    console.log(`${error} ❌`);
  });
