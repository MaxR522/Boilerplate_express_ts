import * as express from 'express';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import morganMiddleware from './config/morganMiddlewares';
import { maxUploadLimit, corsOption } from './config/config';
import limiter from './middlewares/rate_limiter';
import routes from './routes';

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
// Serving static files from doc/
app.use(express.static('doc'));

app.use('/', routes);

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

export default app;
