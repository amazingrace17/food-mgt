import {Router} from 'express';
import ProductController from '../controllers/ProductController.js';
import isVerified from '../middlewares/IsVerified.js';
import isSeller from '../middlewares/IsSeller.js';

import authValidator from '../middlewares/AuthValidator.js';

const router = Router();

router.route('/').post([authValidator, isSeller],ProductController.createProduct).get(ProductController.getProduct);
router.route('/s/:Id').get(ProductController.getProductById).delete().put();
// router.route('/categories').get(ProductController.getCategory).post(authValidator, ProductController.createCategory)
// router.route('/categories/:id').put(authValidator, ProductController.editCategory).delete()


//Order Route==============
router.route('/order').post(authValidator, ProductController.createOrder).get(ProductController.getOrder)

export default router;