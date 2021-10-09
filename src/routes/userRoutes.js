import { Router } from 'express';
import AuthController from '../controllers/AuthController';

const router = Router();

router.route('/register').post(AuthController.signupUser);

export default router;