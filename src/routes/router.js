import express from 'express';
import multer from 'multer';

import userRouter from './userRoutes.js';

const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = express.Router();

// ROUTES
router.use('/users', userRouter)

export default router;
