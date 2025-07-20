import express from 'express';
import { checkout, getUserOrders, getAllOrders, updateOrderStatus, deleteOrder} from './order_controllers.js';
import { verifyToken } from '../../middlewares/verifyToken.js';
import { verifyAdmin } from '../../middlewares/verifyAdmin..js';

const router = express.Router();

router.post('/checkout', verifyToken, checkout);
router.get('/', verifyToken, getUserOrders);

router.get('/all', verifyToken, verifyAdmin, getAllOrders);
router.put('/:id', verifyToken, verifyAdmin, updateOrderStatus);
router.delete('/:id', verifyToken, verifyAdmin, deleteOrder);

export default router; 