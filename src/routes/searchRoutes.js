import { Router } from 'express';
import SearchController from '../controllers/SearchController.js';

import authValidator from '../middlewares/AuthValidator.js';

const router = Router();

router.route('/products')
  .get(SearchController.products)
  ;
router.route('/products-name')
  .get(SearchController.productsByName)
  ;

export default router;