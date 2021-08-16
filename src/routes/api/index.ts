
import { Router } from 'express';
import userApiRoutes from './user.api';
import listingApiRoutes from './listing.api';

const router = Router();

router.use('/api/users', userApiRoutes)
router.use('/api/listings', listingApiRoutes)


export default router;
