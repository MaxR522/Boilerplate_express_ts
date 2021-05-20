/*****************************************************
 *
 *  All configs from env variables
 *
 *****************************************************/

require('dotenv').config();

export const mongooseConfig = {
  dsn: process.env.MONGOOSE_URL || '',
  options: { useNewUrlParser: true, useUnifiedTopology: true },
};

export const port = process.env.PORT || '2222';
