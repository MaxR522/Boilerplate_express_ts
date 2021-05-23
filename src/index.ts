/*********************************************************************
 *                                                                   *
 *      @author Mario Randrianomearisoa <ranjamario@gmail.com>       *
 *                                                                   *
 *                         BOOTSTRAP YOUR APP                        *
 *                                                                   *
 *********************************************************************/

import * as express from 'express'
import * as mongoose from 'mongoose'
import * as cors from 'cors'
import flash = require('express-flash');
import {
  mongooseConfig,
  port,
  maxUploadLimit,
  corsOption
} from './config/config'

const app = express()

/*****************************************************
 *
 *  Define all Routes
 *
 *****************************************************/
app.use(flash())

app.get('/', (req, res) => {
  res.send('well done')
})

app.get('/test', (req: express.Request, res: express.Response) => {
  req.flash('test', 'is it working')
  res.json({ test: 'test it' })
})
/*****************************************************
 *
 *  Middlewares
 *
 *****************************************************/

// Body parser
app.use(express.json({ limit: maxUploadLimit }))
app.use(express.urlencoded({ extended: true, limit: maxUploadLimit }))

// cross-origin
app.use(cors(corsOption))

// Disable x-powered-by header
app.disable('x-powered-by')

// use flash message
// app.use(flash());

/******************************************************
 *
 * Database connection
 *
 ******************************************************/

mongoose.connect(mongooseConfig.dsn, mongooseConfig.options, (error) => {
  if (error) {
    console.log(`${error} ❌`)
    throw error
  } else {
    console.log(`Database :: connection @: ${mongooseConfig.dsn} ✅`)
  }
})

/******************************************************
 *
 * Listen to Port
 *
 ******************************************************/

app
  .listen(port, '0.0.0.0', () => {
    console.log(
      `Server :: application is running @ 'http://localhost:${port}' ! 🎉 `
    )
  })
  .on('error', (error) => {
    console.log(`${error} ❌`)
  })
