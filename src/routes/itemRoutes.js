import {Router} from 'express';
import ItemController from '../controllers/ItemController.js';

import authValidator from '../middlewares/AuthValidator.js';

const router = Router();

router.route('/').post(ItemController.createItem).get(ItemController.getItem);
router.route('/s/:ItemId').get(ItemController.getItemById).delete().put();
router.route('/categories').get(ItemController.getCategory).post(authValidator, ItemController.createCategory)
router.route('/categories/:id').put(authValidator, ItemController.editCategory).delete()


//Order Route==============
router.route('/order').post(authValidator, ItemController.createOrder).get(ItemController.getOrder)

export default router;