import IUser from '../interfaces/models/user_interface';
import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
import * as crypto from 'crypto';

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
    confirmedAt: Date,

    // Password reset
    passwordResetToken: {
      type: String,
    },
    allowPasswordReset: Boolean,
    passwordResetAt: Date,
  },
  { timestamps: true },
);

// Hash user's password before save
UserSchema.pre<IUser>('save', function (next) {
  const user = this;

  // hash email
  const emailHashed = crypto.createHash('md5').update(user.email).digest('hex');

  // Add user's gravatar in user's picture
  user.picture = `https://gravatar.com/avatar/${emailHashed}`;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
