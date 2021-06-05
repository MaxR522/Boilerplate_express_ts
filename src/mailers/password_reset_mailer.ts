import transport from '../config/nodemailer.config';
import { baseUrl, port } from '../config/config';

const sendPasswordResetMail = (email: string, token: string) => {
  console.log(
    '========================================= Password reset Mail link ===========================================',
  );
  console.log(' ');
  console.log(' ');
  console.log(`${baseUrl}:${port}/api/reset_password/${token}`);
  console.log(' ');
  console.log(' ');
  console.log(
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
