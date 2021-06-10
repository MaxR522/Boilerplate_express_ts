import { Router } from 'express';

// Controller
import Register from '../controllers/user_controller/register';
import Login from '../controllers/user_controller/login';
import NewToken from '../controllers/user_controller/refresh_token';
import Logout from '../controllers/user_controller/logout';
import RevokeRefreshToken from '../controllers/user_controller/revoke_refresh_token';
import Confirm from '../controllers/user_controller/confirm';
import ResendConfirmation from '../controllers/user_controller/resend_confirmation';
import ResetPassword from '../controllers/user_controller/post_reset_password';
import GetResetPassword from '../controllers/user_controller/get_reset_password';
import ChangeResetedPassword from '../controllers/user_controller/change_reset_password';
import ChangePassword from '../controllers/user_controller/change_pasword';

// Middlewares
import authValidationFor from '../middlewares/auth_field_validators';
import checkValidationResult from '../middlewares/check_field_validation';
import verifyRefreshToken from '../middlewares/verify_refresh_token';
import verifyAccessToken from '../middlewares/verify_token';
import checkUser from '../middlewares/check_user';
import blacklistedAccessCheck from '../middlewares/blacklist_access_token';
import verifyConfirmationToken from '../middlewares/verify_confirmation_token';
import verifyPasswordResetToken from '../middlewares/verify_password_reset';

// Init Router
const route = Router();

// Documentation at /src/apiDoc/api_routes

route.post(
  '/register',
  authValidationFor('register'),
  checkValidationResult,
  Register,
);

route.post('/login', authValidationFor('login'), checkValidationResult, Login);

route.get(
  '/refresh-token',
  authValidationFor('refresh-token'),
  checkValidationResult,
  verifyRefreshToken,
  checkUser,
  NewToken,
);

route.get(
  '/logout',
  authValidationFor('logout'),
  checkValidationResult,
  verifyAccessToken,
  checkUser,
  blacklistedAccessCheck,
  Logout,
);

route.get(
  '/revoke-token',
  authValidationFor('refresh-token'),
  checkValidationResult,
  verifyRefreshToken,
  RevokeRefreshToken,
);

route.get('/confirm/:confirmationToken', verifyConfirmationToken, Confirm);

route.post(
  '/confirm/send',
  authValidationFor('email_only'),
  checkValidationResult,
  ResendConfirmation,
);

route.post(
  '/password/reset',
  authValidationFor('email_only'),
  checkValidationResult,
  ResetPassword,
);

route.get(
  '/reset_password/:passwordResetToken',
  verifyPasswordResetToken,
  GetResetPassword,
);

route.post(
  '/password/change',
  authValidationFor('password_reset'),
  checkValidationResult,
  ChangeResetedPassword,
);

route.post(
  '/password/modify',
  authValidationFor('modify_password'),
  checkValidationResult,
  verifyAccessToken,
  blacklistedAccessCheck,
  ChangePassword,
);

export default route;
