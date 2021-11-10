import { Router } from 'express';

import SubCategoryController from '../controllers/SubCategoryController.js';
import authValidator from '../middlewares/AuthValidator.js';
import isAdmin from '../middlewares/IsAdmin.js';

const router = Router();

router.route('/')
    .get(SubCategoryController.getSubCategories)
    .post([authValidator, isAdmin], SubCategoryController.createSubCategory)
    ;
router.route('/:id')
    .get(SubCategoryController.getSubCategoryById)
    .put([authValidator, isAdmin], SubCategoryController.updateSubCategory)
    .delete([authValidator, isAdmin], SubCategoryController.deleteSubCategory);

export default router;