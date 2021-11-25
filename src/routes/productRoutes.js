import { Router } from 'express';
import ProductController from '../controllers/ProductController.js';
import isSeller from '../middlewares/IsSeller.js';
import { upload } from "../config/multer.js";

import authValidator from '../middlewares/AuthValidator.js';

const router = Router();

router.route('/')
  .post([authValidator, isSeller], ProductController.createProduct)
  .get(ProductController.getProduct)
  ;
router.route('/:id')
  .get(ProductController.getProductById)
  .put([authValidator, isSeller], ProductController.updateProduct)
  .delete([authValidator, isSeller], ProductController.deleteProduct)
  .post([authValidator, isSeller], upload.single('imageUrl'), ProductController.setProductImage);
  ;

//Order Route==============
router.route('/order')
  .post(authValidator, ProductController.createOrder)
  .get(authValidator, ProductController.getOrder)
  ;

export default router;