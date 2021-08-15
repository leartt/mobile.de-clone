
import { Router } from 'express';
import userApiRoutes from './user.api';

const router = Router();

router.use('/api/users', userApiRoutes)


export default router;
