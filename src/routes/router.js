import express from 'express';
import multer from 'multer';
import restaurantController from '../controllers/RestaurantController.js'

import userRouter from './userRoutes.js';

import itemRouter from './itemRoutes.js'

const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = express.Router();

// ROUTES
router.use('/users', userRouter)
router.use('/product', itemRouter)

router.get("/restaurants", restaurantController.getRestaurants);

// router.get("/restaurant/:restId", restaurantController.getRestaurant);

export default router;
