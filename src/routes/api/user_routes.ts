import { Router } from 'express';

// Controllers
import UpdateInfo from '../../controllers/user_controller/update_info';

// Middlewares
import verifyAccessToken from '../../middlewares/verify_token';
import authValidationFor from '../../middlewares/auth_field_validators';
import checkValidationResult from '../../middlewares/check_field_validation';

// Init Router
const route = Router();

route.patch(
  '/info',
  authValidationFor('user_info'),
  checkValidationResult,
  verifyAccessToken,
  UpdateInfo,
);

export default route;
