import { Router } from 'express';
import CartController from '../controllers/CartController.js';

const router = Router();

router.route('/')
  .post(CartController.createCart)
  .get(CartController.getCart)
  .delete(CartController.deleteCart)
  ;

export default router;