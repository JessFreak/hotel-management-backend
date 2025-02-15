import express from 'express';
import { getCurrentUser, loginUser, registerUser } from '../controllers/authController.js';
import { registerDTO } from '../middlewares/dtos/registerDTO.js';
import { loginDTO } from '../middlewares/dtos/loginDTO.js';
import { validateUniqueUser } from '../middlewares/validateUniqueUser.js';
import { validateToken } from '../middlewares/validateToken.js';

const authRouter = express.Router();

authRouter.post('/register', ...registerDTO, validateUniqueUser, registerUser);

authRouter.post('/login', ...loginDTO, loginUser);

authRouter.get('/me', validateToken, getCurrentUser);

export default authRouter;