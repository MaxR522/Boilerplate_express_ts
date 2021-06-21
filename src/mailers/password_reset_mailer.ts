import transport from '../config/nodemailer.config';
import { baseUrl, port } from '../config/config';
import Logger from '../config/winston';

const sendPasswordResetMail = (email: string, token: string) => {
  Logger.info(
    '========================================= Password reset Mail link ===========================================',
  );
  Logger.info(' ');
  Logger.info(' ');
  Logger.info(`${baseUrl}:${port}/api/reset_password/${token}`);
  Logger.info(' ');
  Logger.info(' ');
  Logger.info(
    '=============================================================================================================+',
  );
  transport.sendMail({
    from: 'boilerplate',
    to: email,
    subject: 'Password reset instruction',
    html: `
      <h1>Password Reset</h1>
      <h2>Your account using email: ${email} have made a request to change password</h2>
      <p>You can reset your password by clicking on this button</p>
      <a href=${baseUrl}:${port}/api/reset_password/${token}> Click here</a>
      <p>If it's not you who made this request, ignore this email, your password remain inchange</p>
    `,
  });
};

export default sendPasswordResetMail;
