import IUser from '../interfaces/models/user';
import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    // Basic information
    email: {
      trim: true,
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    fullname: {
      type: String,
      required: true,
      max: 255,
    },
    picture: {
      type: String,
      trim: true,
      default: '',
    },
    password: {
      type: String,
      min: 6,
      max: 255,
    },
    dateOfBirth: Date,
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },

    // Oauth
    tokens: Array,

    // Confirmation email
    confirmationToken: {
      type: String,
    },
    confirmationSentAt: Date,
    ConfirmedAt: Date,

    // Password reset
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: Date,
  },
  { timestamps: true },
);

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
