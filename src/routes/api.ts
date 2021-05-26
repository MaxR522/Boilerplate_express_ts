import { Router } from 'express';
import Register from '../controllers/user/register';
import Login from '../controllers/user/login';
import * as expressValidator from 'express-validator';
import authValidationFor from '../middlewares/auth_field_validators';
import checkValidationResult from '../middlewares/check_validation';

const route = Router();

route.post(
  '/register',
  authValidationFor('register'),
  checkValidationResult,
  Register,
);

route.post('/login', authValidationFor('login'), checkValidationResult, Login);

export default route;
