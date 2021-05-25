import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import User from '../../models/user';

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
      data: error,
    });
  }

  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);

  // now we set user password to hashed password
  const _hashed_password = await bcrypt.hash(_password, salt);

  const user = new User({
    fullname: _fullname,
    email: _email,
    password: _hashed_password,
    dateOfBirth: _dateOfBirth,
  });

  try {
    const saved_user = await user.save();
    return res.status(201).json({
      success: 'true',
      message: 'register success',
      data: saved_user,
    });
  } catch (error) {
    return res.status(400).json({
      success: 'false',
      message: 'something went wrong',
      data: error,
    });
  }
};

export default Register;
