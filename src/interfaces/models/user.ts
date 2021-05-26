export interface Tokens {
  kind: string;
  accessToken: string;
  tokenSecret?: string;
}

interface IUser {
  // basic info
  email: string;
  fullname: string;
  picture: string;
  password: string;
  dateOfBirth: Date;
  role: string;

  // Oauth
  token: Tokens[];

  // Confirmable
  confirmationToken: string;
  confirmationSentAt: Date;
  ConfirmedAt: Date;

  // Password reset
  passwordResetToken: string;
  passwordResetExpires: Date;
}

export default IUser;
