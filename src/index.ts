/*********************************************************************
 *                                                                   *
 *      @author Mario Randrianomearisoa <ranjamario@gmail.com>       *
 *                                                                   *
 *                         BOOTSTRAP YOUR APP                        *
 *                                                                   *
 *********************************************************************/

import * as express from 'express';
import * as mongoose from 'mongoose';
import { mongooseConfig, port } from './config/config';

const app = express();

/*****************************************************
 *
 *  Define all Routes
 *
 *****************************************************/

app.get('/', (req, res) => {
  res.send('well done');
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
    console.log(`${error} ❌`);
    throw error;
  } else {
    console.log(`Database :: connection on: ${mongooseConfig.dsn} ✅`);
  }
});

/******************************************************
 *
 * Listen to Port
 *
 ******************************************************/

app
  .listen(port, '0.0.0.0', () => {
    console.log(`Server :: The application is running on port ${port} ! 🎉 `);
  })
  .on('error', (error) => {
    console.log(`${error} ❌`);
  });
