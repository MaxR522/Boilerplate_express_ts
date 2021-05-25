import { body } from 'express-validator';

const createValidationFor = (route: string) => {
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
          const password_rgxp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/;
          return password_rgxp.test(value);
        }),
        body('dateOfBirth', 'dateOfBirth cannot be blank').notEmpty(),
        body('dateOfBirth', 'Wrong format of date in DateOfBirth').custom(
          (value) => {
            // MM/DD/YYYY
            const validDate: any = new Date(value);
            return validDate === 'Invalid Date';
          },
        ),
      ];

    case 'login':
      return [
        body('email', 'email cannot be blank').notEmpty(),
        body('password', 'password cannot be blank').notEmpty(),
      ];

    default:
      return [];
  }
};

export default createValidationFor;
