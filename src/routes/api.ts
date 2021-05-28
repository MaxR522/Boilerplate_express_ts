import { Router } from 'express';

// Controller
import Register from '../controllers/user/register';
import Login from '../controllers/user/login';
import NewToken from '../controllers/user/refresh_token';
import Logout from '../controllers/user/logout';
import RevokeRefreshToken from '../controllers/user/revoke_refresh_token';

// Middlewares
import authValidationFor from '../middlewares/auth_field_validators';
import checkValidationResult from '../middlewares/check_field_validation';
import verifyRefreshToken from '../middlewares/verify_refresh_token';
import verifyAccessToken from '../middlewares/verify_token';
import checkUser from '../middlewares/check_user';
import blacklistedAccessCheck from '../middlewares/blacklist_access_token';

// Init Router
const route = Router();

route.post(
  '/register',
  authValidationFor('register'),
  checkValidationResult,
  Register,
);

route.post('/login', authValidationFor('login'), checkValidationResult, Login);

route.post('/refresh_token', verifyRefreshToken, checkUser, NewToken);

route.get(
  '/logout',
  verifyAccessToken,
  checkUser,
  blacklistedAccessCheck,
  Logout,
);

route.post('/revoke', verifyRefreshToken, RevokeRefreshToken);

export default route;
