import express from 'express';
// import { register, login } from '../controllers/authController';
import { register, login } from '~/controllers/authController';

const router = express.Router();

router.post('/register', register); // Đăng ký
router.post('/login', login);       // Đăng nhập

export default router;
