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
  };
};

export const mongooseConfig = {
  dsn: process.env.MONGOOSE_URL || '',
  options: { useNewUrlParser: true, useUnifiedTopology: true },
};

export const port = process.env.PORT || 2222;
