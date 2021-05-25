import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import * as bcrypt from 'bcrypt';
import User from '../../models/user';

const Register = async (req: Request, res: Response) => {
  // Validation
  body('fullname', 'fullname cannot be blank').notEmpty();
  body('email', 'email cannot be blank').notEmpty();
  body('email', 'Invalid email').isEmail();
  body('password', 'password cannot be blank').notEmpty();
  body('password', 'password is too short, at least 6 chars').isLength({
    min: 6,
  });
  body(
    'password',
    'password must contain digit, lower case and upper case letter',
  ).custom((value: string) => {
    const password_rgxp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/;
    return password_rgxp.test(value);
  });
  body('dateOfBirth', 'dateOfBirth cannot be blank').notEmpty();
  body('dateOfBirth', 'Wrong format of date in DateOfBirth').custom((value) => {
    const isDate: any = value ? Date.parse(value) : '';
    return isDate === NaN;
  });

  const errors = await validationResult(req);
  if (errors) {
    console.log(errors.array());
    // if element.location === 'body' means the params is not missing but invalid
    // if (errors.some((element: any) => element.location === 'body')) {
    //   return res.status(422).json({
    //     success: 'false',
    //     message: 'Wrong params format',
    //     data: errors,
    //   });
    // }
    return res.status(409).json({
      success: 'false',
      message: 'Wrong params',
      data: errors,
    });
  }

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
