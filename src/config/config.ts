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
  };
};

export const mongooseConfig = {
  dsn: process.env.MONGOOSE_URL || '',
  options: { useNewUrlParser: true, useUnifiedTopology: true },
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
};
