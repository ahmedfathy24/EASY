import express from 'express';
import { getCart , addToCart , removeFromCart , updateCartItem } from './cart_controllers.js';
import { verifyToken } from '../../middlewares/verifyToken.js';

const router = express.Router();

router.get('/', verifyToken, getCart); 
router.post('/add', verifyToken, addToCart); 
router.delete('/remove', verifyToken, removeFromCart); 
router.put('/update', verifyToken, updateCartItem); 

export default router; 