import { Router } from 'express';
// Controller
import Register from '../controllers/user/register';
import Login from '../controllers/user/login';
import NewToken from '../controllers/user/refresh_token';
// Middlewares
import authValidationFor from '../middlewares/auth_field_validators';
import checkValidationResult from '../middlewares/check_field_validation';
import verifyRefreshToken from '../middlewares/verify_refresh_token';

const route = Router();

route.post(
  '/register',
  authValidationFor('register'),
  checkValidationResult,
  Register,
);

route.post('/login', authValidationFor('login'), checkValidationResult, Login);

route.post('/refresh_token', verifyRefreshToken, NewToken);

export default route;
