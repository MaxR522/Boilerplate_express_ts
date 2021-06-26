import { Router } from 'express';
import authRoutes from './api/auth';
import userRoutes from './api/user_routes';

// Init Router
const route = Router();

route.use('/api/auth', authRoutes);
route.use('/api/users', userRoutes);

export default route;
