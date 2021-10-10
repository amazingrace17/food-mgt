import { Router } from 'express';
import AuthController from '../ccontrollers/AuthController.js';

const router = Router();

router.route('/register')
      .post(AuthController.signupUser);

export default router;