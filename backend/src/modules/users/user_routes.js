import express from 'express';
import { registerUser , signIn, getProfile, getAllUsers, deleteUser }from './user_controllers.js';
import { verifyToken } from '../../middlewares/verifyToken.js';
import { verifyAdmin } from '../../middlewares/verifyAdmin..js';
import { checkEmail } from '../../middlewares/checkEmail.js';

const router = express.Router();


router.post('/register', checkEmail, registerUser); 
router.post('/login', signIn); 
router.get('/me', verifyToken, getProfile); 

router.get('/', verifyToken, verifyAdmin , getAllUsers); 
router.delete('/:id', verifyToken, verifyAdmin , deleteUser); 

export default router; 