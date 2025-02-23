import { Router } from 'express';
import { checkDiscountExist } from '../middlewares/checkDiscountExist.js';
import { checkUserExist } from '../middlewares/checkUserExist.js';
import { addUserDiscount, getUserById, getUserDiscounts, getUsers } from '../controllers/userController.js';
import { receptionistGuard } from '../middlewares/receptionistGuard.js';
import { validateToken } from '../middlewares/validateToken.js';
import { filterUsersDTO } from '../middlewares/dtos/filterUsersDTO.js';

const userRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users management routes
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a filtered list of users
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: email
 *         in: query
 *         description: Filter users by email
 *         required: false
 *         schema:
 *           type: string
 *           example: "example@example.com"
 *       - name: name
 *         in: query
 *         description: Filter users by name (first, last, or middle)
 *         required: false
 *         schema:
 *           type: string
 *           example: "John"
 *       - name: passportNumber
 *         in: query
 *         description: Filter users by passport number
 *         required: false
 *         schema:
 *           type: string
 *           example: "AB1234567"
 *       - name: role
 *         in: query
 *         description: Filter users by role (receptionist or client)
 *         required: false
 *         schema:
 *           type: string
 *           enum: ["receptionist", "client"]
 *           example: "client"
 *     responses:
 *       200:
 *         description: A list of users that match the filter criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/responses/User"
 *       401:
 *         $ref: "#/components/responses/UnauthorizedError"
 *       403:
 *         $ref: "#/components/responses/ForbiddenError"
 */
userRouter.get('/', validateToken, receptionistGuard, ...filterUsersDTO, getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by their ID
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID to fetch
 *         required: true
 *         schema:
 *           type: string
 *           example: "60c72b2f9b1d8b8f1c8e4d0c"
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/responses/User"
 *
 *       401:
 *         $ref: "#/components/responses/UnauthorizedError"
 *       403:
 *         $ref: "#/components/responses/ForbiddenError"
 *       404:
 *         $ref: "#/components/responses/NotFoundError"
 */
userRouter.get('/:id', validateToken, receptionistGuard, checkUserExist, getUserById);

/**
 * @swagger
 * /users/{id}/discounts:
 *   get:
 *     summary: Get discounts for a user by their ID
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID to fetch their discounts
 *         required: true
 *         schema:
 *           type: string
 *           example: "60c72b2f9b1d8b8f1c8e4d0c"
 *     responses:
 *       200:
 *         description: List of discounts for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/responses/Discount"
 *       401:
 *         $ref: "#/components/responses/UnauthorizedError"
 *       403:
 *         $ref: "#/components/responses/ForbiddenError"
 *       404:
 *         $ref: "#/components/responses/NotFoundError"
 */
userRouter.get('/:id/discounts', validateToken, receptionistGuard, checkUserExist, getUserDiscounts);

/**
 * @swagger
 * /users/{id}/discounts:
 *   post:
 *     summary: Assign a discount to a user by their ID
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID to assign a discount
 *         required: true
 *         schema:
 *           type: string
 *           example: "60c72b2f9b1d8b8f1c8e4d0c"
 *       - name: discountId
 *         in: query
 *         description: Discount ID to assign to the user
 *         required: true
 *         schema:
 *           type: string
 *           example: "60c72b2f9b1d8b8f1c8e4d0c"
 *     responses:
 *       201:
 *         description: Discount successfully assigned to the user
 *       400:
 *         description: User already has this discount
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "User already has this discount"
 *       401:
 *         $ref: "#/components/responses/UnauthorizedError"
 *       403:
 *         $ref: "#/components/responses/ForbiddenError"
 *       404:
 *         $ref: "#/components/responses/NotFoundError"
 */
userRouter.post('/:id/discounts', validateToken, receptionistGuard, checkUserExist, checkDiscountExist, addUserDiscount);

export default userRouter;