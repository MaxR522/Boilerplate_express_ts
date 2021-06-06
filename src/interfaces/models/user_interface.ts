import { Document } from 'mongoose';

export interface Tokens {
  kind: string;
  accessToken: string;
  tokenSecret?: string;
}

interface IUser extends Document {
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
  confirmedAt: Date;

  // Password reset
  passwordResetToken: string;
  allowPasswordReset: boolean;
  passwordResetedAt: Date;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

export default IUser;
