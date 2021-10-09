import { Router } from 'express';
import cors from 'cors';
import AuthController from '../controllers/AuthController.js';
// import authValidator from '../middlewares/AuthValidator.js';

const router = Router();

router.route('/register')
    .post(AuthController.signupUser);

export default router;