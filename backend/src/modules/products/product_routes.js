import express from 'express';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getLatestProducts}from './product_controllers.js';
import { verifyToken } from '../../middlewares/verifyToken.js';
import { verifyAdmin } from '../../middlewares/verifyAdmin..js';

const router = express.Router();

router.get('/latest', getLatestProducts); 
router.get('/', getAllProducts); 
router.get('/:id', getProductById); 

router.post('/admin/create', verifyToken, verifyAdmin  ,  createProduct); 
router.put('/admin/update/:id', verifyToken, verifyAdmin ,  updateProduct); 
router.delete('/admin/delete/:id', verifyToken, verifyAdmin , deleteProduct); 

export default router; 