import {Router} from 'express';
import Controller from '../controllers/Controller.js';

import authValidator from '../middlewares/AuthValidator.js';

const router = Router();

router.route('/').post(Controller.create).get(Controller.get);
router.route('/s/:Id').get(Controller.getById).delete().put();
router.route('/categories').get(Controller.getCategory).post(authValidator, Controller.createCategory)
router.route('/categories/:id').put(authValidator, Controller.editCategory).delete()


//Order Route==============
router.route('/order').post(authValidator, Controller.createOrder).get(Controller.getOrder)

export default router;