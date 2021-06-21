import transport from '../config/nodemailer.config';
import { baseUrl, port } from '../config/config';
import Logger from '../config/winston';

const sendConfirmationEmail = (
  name: string = '',
  email: string,
  token: string,
) => {
  Logger.info(
    '========================================= Confirmation Mail Link ===========================================',
  );
  Logger.info(' ');
  Logger.info(' ');
  Logger.info(`${baseUrl}:${port}/api/confirm/${token}`);
  Logger.info(' ');
  Logger.info(' ');
  Logger.info(
    '=============================================================================================================',
  );
  transport.sendMail({
    from: 'boilerplate',
    to: email,
    subject: 'Account confirmation instruction',
    html: `
      <h1>Email Confirmation</h1>
      <h2>Hello ${name}</h2>
      <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
      <a href=${baseUrl}:${port}/api/confirm/${token}> Click here</a>
    `,
  });
};

export default sendConfirmationEmail;
