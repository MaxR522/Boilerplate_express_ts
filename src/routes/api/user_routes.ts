import { Router } from 'express';

// Controllers
import UpdateInfo from '../../controllers/user_controller/update_info';
import ShowOneUser from '../../controllers/user_controller/show_one';
import ShowAllUser from '../../controllers/user_controller/show_all';
import DeleteUser from '../../controllers/user_controller/delete';

// Middlewares
import verifyAccessToken from '../../middlewares/verify_token';
import authValidationFor from '../../middlewares/auth_field_validators';
import checkValidationResult from '../../middlewares/check_field_validation';
import blacklistedAccessCheck from '../../middlewares/blacklist_access_token';

// Init Router
const route = Router();

route.patch(
  '/:id/info',
  authValidationFor('user_info'),
  checkValidationResult,
  verifyAccessToken,
  blacklistedAccessCheck,
  UpdateInfo,
);

route.get('/all', ShowAllUser);

route.get('/:id', ShowOneUser);

route.delete(
  '/:id',
  authValidationFor('password_only'),
  checkValidationResult,
  verifyAccessToken,
  blacklistedAccessCheck,
  DeleteUser,
);

export default route;
