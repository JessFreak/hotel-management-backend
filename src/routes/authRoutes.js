import express from 'express';
import { getCurrentUser, loginUser, logout, registerUser } from '../controllers/authController.js';
import { registerDTO } from '../middlewares/dtos/registerDTO.js';
import { loginDTO } from '../middlewares/dtos/loginDTO.js';
import { validateUniqueUser } from '../middlewares/validateUniqueUser.js';
import { validateToken } from '../middlewares/validateToken.js';

const authRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication and registration routes
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [firstName, lastName, passportNumber, email, password]
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               passportNumber:
 *                 type: string
 *                 minLength: 6
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
authRouter.post('/register', ...registerDTO, validateUniqueUser, registerUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user. Sets a JWT cookie
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid email or password
 */
authRouter.post('/login', ...loginDTO, loginUser);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current user via JWT
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         $ref: "#/components/responses/User"
 *       401:
 *         $ref: "#/components/responses/UnauthorizedError"
 */
authRouter.get('/me', validateToken, getCurrentUser);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user. Clears JWT cookie
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully logged out
 *       401:
 *         $ref: "#/components/responses/UnauthorizedError"
 */
authRouter.post('/logout', validateToken, logout);

export default authRouter;