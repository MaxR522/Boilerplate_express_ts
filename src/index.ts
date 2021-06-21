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
import * as cookieParser from 'cookie-parser';
import morganMiddleware from './config/morganMiddlewares';
import {
  mongooseConfig,
  port,
  maxUploadLimit,
  corsOption,
  redisHost,
  redisPort,
} from './config/config';
import Logger from './config/winston';
import limiter from './middlewares/rate_limiter';
import apiRoute from './routes/api';

export const app = express();

/*****************************************************
 *
 *  Middlewares
 *
 *****************************************************/

// Body parser
app.use(express.json({ limit: maxUploadLimit }));
app.use(express.urlencoded({ extended: true, limit: maxUploadLimit }));

// Cookie parser
app.use(cookieParser());

// cross-origin
app.use(cors(corsOption));

// Disable x-powered-by header
app.disable('x-powered-by');

// Enable trust proxy
app.enable('trust proxy');

// Use morgan for http logger
app.use(morganMiddleware);

// Rate limiter per ip
app.use(limiter);

/*****************************************************
 *
 *  Define all Routes
 *
 *****************************************************/
// Serving static files from "public" folder
app.use(express.static('doc'));

app.get('/', (req, res) => {
  res.send('well done');
});

app.use('/api', apiRoute);

/*****************************************************
 *
 *  Error handlers
 *
 *****************************************************/

// Return 404 when not found endpoint
app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({
    success: 'false',
    message: `endpoint ${req.originalUrl} not found`,
  });
});

// Handle syntax error on request
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    if (err instanceof SyntaxError) {
      return res.status(400).json({
        success: 'false',
        message: 'The body of your request is not valid json!',
      });
    }
  },
);

/******************************************************
 *
 * Database connection
 *
 ******************************************************/

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

/******************************************************
 *
 * Listen to Port
 *
 ******************************************************/

app
  .listen(port, '0.0.0.0', () => {
    Logger.info(
      `Server :: application is running @ 'http://localhost:${port}' ! 🎉 `,
    );
  })
  .on('error', (error) => {
    Logger.info(`${error} ❌`);
  });
