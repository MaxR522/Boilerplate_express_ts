import { body } from 'express-validator';

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

    case 'resend_confirmation':
      return [
        body('email', 'email cannot be blank').notEmpty(),
        body('email', 'Invalid email').isEmail(),
      ];

    default:
      return [];
  }
};

export default authValidationFor;
