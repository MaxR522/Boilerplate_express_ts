import { Router } from 'express';
import Register from '../controllers/user/register';
import Login from '../controllers/user/login';
import * as expressValidator from 'express-validator';
import createValidationFor from '../middlewares/create_validator';
import checkValidationResult from '../middlewares/check_validation';

const route = Router();

route.post(
  '/register',
  createValidationFor('register'),
  checkValidationResult,
  Register,
);

route.post(
  '/login',
  createValidationFor('login'),
  checkValidationResult,
  Login,
);

export default route;
