import * as nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  port: 1025,
  ignoreTLS: true,
  // other settings...
});

export default transport;
