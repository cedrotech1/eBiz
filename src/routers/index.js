import express from 'express';

import docrouter from '../documentation/index.doc';
import userRouter from './userRouter';
import authRouter from './authRouter';
import PostRouter from './BusinesesRouter';
import favoriteRoutes from './favoritesRoutes';
import ReviewRoutes from './ReviewRoutes';

const router = express.Router();

router.use('/docs', docrouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/Busineses', PostRouter);
router.use('/favorite', favoriteRoutes);
router.use('/', ReviewRoutes);



export default router;
