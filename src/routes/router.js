import express from 'express';
import multer from 'multer';
// import restaurantController from '../controllers/RestaurantController.js'

import userRouter from './userRoutes.js';
import adminRouter from './adminRoutes.js';
import categoryRouter from './categoryRoutes.js';
import subCategoryRouter from './subCategoryRoutes.js';
import cartRouter from './cartRouter.js'
import productRouter from './productRoutes.js'

const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = express.Router();

// ROUTES
router.use('/users', userRouter)
router.use('/product', productRouter)


// router.get("/restaurants", restaurantController.getRestaurants);

// router.get("/restaurant/:restId", restaurantController.getRestaurant);
router.use('/admins', adminRouter)
router.use('/categories', categoryRouter)
router.use('/subcategories', subCategoryRouter)
router.use('/cart', cartRouter)
export default router;
