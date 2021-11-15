import { Router } from 'express';
import cors from 'cors';
import AdminController from '../controllers/AdminController.js';
import authValidator from '../middlewares/AuthValidator.js';
import isAdmin from '../middlewares/IsAdmin.js';

const router = Router();

router.route('/new/:id')
    .put([ authValidator, isAdmin ], AdminController.makeAdmin)
    ;

export default router;