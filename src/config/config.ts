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
    MONGOOSE_URL_DEV: string;
    MONGOOSE_URL_TEST: string;
    MONGOOSE_URL_PROD: string;
    MAX_UPLOAD_LIMIT: string;
    ORIGIN: string;
    ACCES_TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
    ACCESS_TOKEN_LIMIT: string;
    REFRESH_TOKEN_LIMIT: string;
    CONFIRMATION_TOKEN_SECRET: string;
    CONFIRMATION_TOKEN_LIMIT: string;
    PASSWORD_TOKEN_SECRET: string;
    PASSWORD_TOKEN_LIMIT: string;
    REDIS_PORT: number;
    REDIS_HOST: string;
    TTL_ACCESS_TOKEN: number;
    TTL_PASSWORD_RESET: number;
    TTL_ATTEMPT_LOGIN: number;
    NODE_ENV: string;
    BASE_URL: string;
    REDIRECT_URL_CONFIRMATION: string;
    REDIRECT_URL_PASSWORD_RESET: string;
    MAX_ATTEMPT_LOGIN: number;
    WINDOW_MS: number;
    MAX_REQUEST: number;
  };
};

export const env = process.env.NODE_ENV;

if (env === 'test') {
  process.env.MONGOOSE_URL = process.env.MONGOOSE_URL_TEST;
} else if (env === 'development') {
  process.env.MONGOOSE_URL = process.env.MONGOOSE_URL_DEV;
} else if (env === 'production') {
  process.env.MONGOOSE_URL = process.env.MONGOOSE_URL_PROD;
}

// console.log(process.env.MONGOOSE_URL);
export const mongooseConfig = {
  dsn: process.env.MONGOOSE_URL,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
};

export const port = process.env.PORT || 2222;

export const baseUrl = process.env.BASE_URL || 'http://localhost';

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

// JWT config
export const accessTokenSecret =
  process.env.ACCES_TOKEN_SECRET || 'MyAccessSecret ';
export const refreshTokenSecret =
  process.env.REFRESH_TOKEN_SECRET || 'MyRefreshSecret';
export const confirmationTokenSecret =
  process.env.CONFIRMATION_TOKEN_SECRET || 'MyConfirmationSecret';
export const passwordTokenSecret =
  process.env.PASSWORD_TOKEN_SECRET || 'MyPasswordTokenSecret';

export const accessTokenLimit = process.env.ACCESS_TOKEN_LIMIT || '30m';
export const refreshTokenLimit = process.env.REFRESH_TOKEN_LIMIT || '30d';
export const confirmationTokenLimit =
  process.env.CONFIRMATION_TOKEN_LIMIT || '1d';
export const passwordTokenLimit = process.env.PASSWORD_TOKEN_LIMIT || '1d';

export const redisPort = process.env.REDIS_PORT || 6379;
export const redisHost = process.env.REDIS_HOST || '127.0.0.1';

export const ttlAccessToken = process.env.TTL_ACCESS_TOKEN || 60;
export const ttlResetPassword = process.env.TTL_PASSWORD_RESET || 24 * 60;
export const ttlAttemptLogin = process.env.TTL_ATTEMPT_LOGIN || 10;

export const redirectUrlConfirmation =
  process.env.REDIRECT_URL_CONFIRMATION || 'https://github.com/MaxR522';

export const redirectUrlPasswordReset =
  process.env.REDIRECT_URL_PASSWORD_RESET || 'https://github.com/MaxR522';

export const maxAttemptOnLogin = process.env.MAX_ATTEMPT_LOGIN || 10;

export const windowMs = process.env.WINDOW_MS || 60;
export const maxRequest = process.env.MAX_REQUEST || 1000;
