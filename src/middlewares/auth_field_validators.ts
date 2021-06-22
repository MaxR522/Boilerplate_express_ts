import { body, cookie, header, param } from 'express-validator';
// import Logger from '../config/winston';

const authValidationFor = (route: string) => {
  switch (route) {
    case 'register':
      return [
        // Validation
        body('fullname', 'fullname cannot be blank').notEmpty(),
        body('email', 'email cannot be blank').notEmpty(),
        body('email', 'Invalid email').isEmail(),
        body('password', 'password cannot be blank').notEmpty(),
        body('password', 'password is too short, at least 6 chars').isLength({
          min: 6,
        }),
        body(
          'password',
          'password must contain digit, lower case and upper case letter',
        ).custom((value: string) => {
          const passwordRgxp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/;
          return passwordRgxp.test(value);
        }),
        body('dateOfBirth', 'dateOfBirth cannot be blank').notEmpty(),
        body('dateOfBirth', 'Wrong format of date in DateOfBirth').custom(
          (value) => {
            // MM/DD/YYYY
            return !isNaN(Date.parse(value));
          },
        ),
      ];

    case 'login':
      return [
        body('email', 'email cannot be blank').notEmpty(),
        body('password', 'password cannot be blank').notEmpty(),
      ];

    case 'email_only':
      return [
        body('email', 'email cannot be blank').notEmpty(),
        body('email', 'Invalid email').isEmail(),
      ];

    case 'password_reset':
      return [
        body('email', 'email cannot be blank').notEmpty(),
        body('email', 'Invalid email').isEmail(),
        body('newPassword', 'newPassword cannot be blank').notEmpty(),
        body(
          'newPassword',
          'newPassword is too short, at least 6 chars',
        ).isLength({
          min: 6,
        }),
        body(
          'newPassword',
          'newPassword must contain digit, lower case and upper case letter',
        ).custom((value: string) => {
          const passwordRgxp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/;
          return passwordRgxp.test(value);
        }),
      ];

    case 'modify_password':
      return [
        body('email', 'email cannot be blank').notEmpty(),
        body('password', 'password cannot be blank').notEmpty(),
        body('newPassword', 'newPassword cannot be blank').notEmpty(),
        body(
          'newPassword',
          'newPassword is too short, at least 6 chars',
        ).isLength({
          min: 6,
        }),
        body(
          'newPassword',
          'newPassword must contain digit, lower case and upper case letter',
        ).custom((value: string) => {
          const passwordRgxp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/;
          return passwordRgxp.test(value);
        }),
      ];

    case 'refresh-token':
      return [
        cookie(
          'refresh_token',
          'refresh_token cookie must be provided',
        ).notEmpty(),
      ];

    case 'logout':
      return [
        header(
          'authorization',
          'Authorization header must be provided',
        ).notEmpty(),
      ];

    case 'user_info':
      return [
        body('dateOfBirth', 'Wrong format of date in DateOfBirth').custom(
          (value) => {
            if (!value) {
              return true;
            }
            // MM/DD/YYYY
            return !isNaN(Date.parse(value));
          },
        ),
      ];

    case 'password_only':
      return [body('password', 'password cannot be blank').notEmpty()];

    default:
      return [];
  }
};

export default authValidationFor;
