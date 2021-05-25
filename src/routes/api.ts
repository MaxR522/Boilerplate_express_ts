import { Router } from 'express';
import Register from '../controllers/user/register';
import Login from '../controllers/user/login';
import * as expressValidator from 'express-validator';

const route = Router();

route.post('/register', Register);
route.post('/login', Login);

export default route;
