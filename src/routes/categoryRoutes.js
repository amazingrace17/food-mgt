import { Router } from 'express';

import CategoryController from '../controllers/CategoryController.js';
import authValidator from '../middlewares/AuthValidator.js';
import isAdmin from '../middlewares/IsAdmin.js';

const router = Router();

router.route('/')
    .get(CategoryController.getCategories)
    .post([authValidator, isAdmin], CategoryController.createCategory)
    ;
router.route('/:id')
    .get(CategoryController.getCategoryById)
    .put([authValidator, isAdmin], CategoryController.updateCategory)
    .delete([authValidator, isAdmin], CategoryController.deleteCategory)
    ;

export default router;
