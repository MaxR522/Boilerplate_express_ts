/*********************************************************************
 *                                                                   *
 *      @author Mario Randrianomearisoa <ranjamario@gmail.com>       *
 *                                                                   *
 *                         BOOTSTRAP YOUR APP                        *
 *                                                                   *
 *********************************************************************/
import app from './_app';
import { port } from './config/config';
import Logger from './config/winston';

app
  .listen(port, '0.0.0.0', () => {
    Logger.info(
      `Server :: application is running @ 'http://localhost:${port}' ! 🎉 `,
    );
  })
  .on('error', (error) => {
    Logger.info(`${error} ❌`);
  });
