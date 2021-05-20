/*********************************************************************
 *
 * @author Mario Randrianomearisoa <ranjamario@gmail.com>
 *
 *********************************************************************/

import * as express from 'express';
import * as mongoose from 'mongoose';
import mongooseConfig from './config/db_config';

require('dotenv').config();

const app = express();

/*****************************************************
 *
 *  Define all Routes
 *
 *****************************************************/

app.get('/', (req, res) => {
  res.send('well done     <j!!!');
});

/*****************************************************
 *
 *  Middlewares
 *
 *****************************************************/

/******************************************************
 *
 * Database connection
 *
 ******************************************************/

mongoose.connect(mongooseConfig.dsn, mongooseConfig.options, (error) => {
  if (error) {
    console.log(error);
    throw error;
  } else {
    console.log(`Database connection on: ${mongooseConfig.dsn} ✅`);
  }
});

/******************************************************
 *
 * Listen to Port
 *
 ******************************************************/

const port = process.env.PORT || 2222;

app.listen(port, () => {
  console.log(`The application is running on port ${port} ! 🎉 `);
});
