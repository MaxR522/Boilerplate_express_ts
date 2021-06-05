import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import User from '../../models/user';
import sendConfirmationEmail from '../../mailers/confirmation_mailer';
import * as jwt from 'jsonwebtoken';
import {
  confirmationTokenSecret,
  confirmationTokenLimit,
} from '../../config/config';

const Register = async (req: Request, res: Response) => {
  const _fullname = req.body.fullname;
  const _email = req.body.email;
  const _password = req.body.password;
  const _dateOfBirth = req.body.dateOfBirth;

  // Check if the account is already exists
  try {
    const user = await User.findOne({ email: _email });
    if (user) {
      return res.status(409).json({
        success: 'false',
        message: `An account with email: ${_email} is already exists`,
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: 'false',
      message: 'something went wrong',
      errors: error,
    });
  }

  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);

  // now we set user password to hashed password
  const _hashedPassword = await bcrypt.hash(_password, salt);

  // Generate confirmation token
  const confirmationToken = await jwt.sign(
    { email: _email },
    confirmationTokenSecret,
    { expiresIn: confirmationTokenLimit },
  );

  const user = new User({
    fullname: _fullname,
    email: _email,
    password: _hashedPassword,
    dateOfBirth: _dateOfBirth,
    confirmationToken: confirmationToken,
    confirmationSentAt: new Date(),
  });

  try {
    const savedUser = await user.save();

    const userData = {
      id: savedUser._id,
      fullname: savedUser.fullname,
      dateOfBirth: savedUser.dateOfBirth,
      email: savedUser.email,
      role: savedUser.role,
      picture: savedUser.picture,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt,
    };

    sendConfirmationEmail(
      savedUser.fullname,
      savedUser.email,
      savedUser.confirmationToken,
    );

    return res.status(201).json({
      success: 'true',
      message: 'register success',
      data: userData,
    });
  } catch (error) {
    return res.status(400).json({
      success: 'false',
      message: 'something went wrong',
      errors: error,
    });
  }
};

export default Register;
