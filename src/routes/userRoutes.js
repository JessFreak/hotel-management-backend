import express from 'express';
import { getCurrentUser, loginUser, registerUser } from '../controllers/userController.js';
import { registerDTO } from '../middlewares/dtos/registerDTO.js';
import { loginDTO } from '../middlewares/dtos/loginDTO.js';
import { validateUniqueUser } from '../middlewares/validateUniqueUser.js';
import { validateToken } from '../middlewares/validateToken.js';

const router = express.Router();

router.post('/register', ...registerDTO, validateUniqueUser, registerUser);

router.post('/login', ...loginDTO, loginUser);

router.get('/me', validateToken, getCurrentUser);

export default router;