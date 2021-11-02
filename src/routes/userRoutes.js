import { Router } from 'express';
import cors from 'cors';
import UserController from '../controllers/UserController.js';
import authValidator from '../middlewares/AuthValidator.js';
import isVerified from '../middlewares/IsVerified.js';

const router = Router();

router.route('/register')
    .post(UserController.register);
router.route('/login')
    .post(UserController.login);
router.route('/:id')
    .get(authValidator, isVerified, UserController.profile)
    ;

export default router;