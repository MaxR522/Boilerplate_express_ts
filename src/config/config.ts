/*****************************************************
 *
 *  All configs from env variables
 *
 *****************************************************/

require('dotenv').config();

// Define all types of .env variables
declare var process: {
  env: {
    PORT: number;
    MONGOOSE_URL: string;
    MAX_UPLOAD_LIMIT: string;
    ORIGIN: string;
    ACCES_TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
    ACCESS_TOKEN_LIMIT: string;
    REFRESH_TOKEN_LIMIT: string;
    REDIS_PORT: number;
    REDIS_HOST: string;
  };
};

export const mongooseConfig = {
  dsn: process.env.MONGOOSE_URL || '',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
};

export const port = process.env.PORT || 2222;

export const maxUploadLimit = process.env.MAX_UPLOAD_LIMIT || '50mb';

export const corsOption = {
  origin: process.env.ORIGIN,
  // allowedHeaders: '',
  // exposedHeaders: '',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};

export const accessTokenSecret =
  process.env.ACCES_TOKEN_SECRET || 'MyAccessSecret ';
export const refreshTokenSecret =
  process.env.REFRESH_TOKEN_SECRET || 'MyRefreshSecret';

export const accessTokenLimit = process.env.ACCESS_TOKEN_LIMIT || '30m';
export const refreshTokenLimit = process.env.REFRESH_TOKEN_LIMIT || '30d';

export const redisPort = process.env.REDIS_PORT || 6379;
export const redisHost = process.env.REDIS_HOST || '127.0.0.1';
