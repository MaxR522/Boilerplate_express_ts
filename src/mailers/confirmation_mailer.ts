import transport from '../config/nodemailer.config';
import { baseUrl, port } from '../config/config';

const sendConfirmationEmail = (
  name: string = '',
  email: string,
  token: string,
) => {
  console.log(
    '========================================= Confirmation Mail Link ===========================================',
  );
  console.log(' ');
  console.log(' ');
  console.log(`${baseUrl}:${port}/api/confirm/${token}`);
  console.log(' ');
  console.log(' ');
  console.log(
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
