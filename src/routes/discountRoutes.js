import express from 'express';
import { validateToken } from '../middlewares/validateToken.js';
import { receptionistGuard } from '../middlewares/receptionistGuard.js';
import {
  createDiscount,
  deleteDiscount,
  getDiscountById,
  getDiscounts,
  updateDiscount
} from '../controllers/discountController.js';
import { createDiscountDTO, updateDiscountDTO } from '../middlewares/dtos/discountDTO.js';
import { checkDiscountExist } from '../middlewares/checkDiscountExist.js';

const discountRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Discounts
 *   description: Discounts management routes
 */

/**
 * @swagger
 * /discounts:
 *   get:
 *     summary: Get a list of all discounts
 *     tags: [Discounts]
 *     responses:
 *       200:
 *         description: A list of discounts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/responses/Discount"
 */
discountRouter.get('/', getDiscounts);

/**
 * @swagger
 * /discounts/{id}:
 *   get:
 *     summary: Get discount details by discount ID
 *     tags: [Discounts]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The unique identifier of the discount
 *         required: true
 *         schema:
 *           type: string
 *           example: 60c72b2f9b1d8b8f1c8e4d0c
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/responses/Discount"
 *
 *       404:
 *         $ref: "#/components/responses/NotFoundError"
 */
discountRouter.get('/:id', checkDiscountExist, getDiscountById);

/**
 * @swagger
 * /discounts:
 *   post:
 *     summary: Create a new discount
 *     tags: [Discounts]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the discount
 *                 example: "Winter Sale"
 *               percentage:
 *                 type: number
 *                 description: Discount percentage (must be between 0 and 100)
 *                 example: 20
 *             required:
 *               - name
 *               - percentage
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/responses/Discount"
 *
 *       400:
 *         description: Invalid data provided
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
 *                   example: "Discount name and percentage are required, and percentage must be a number between 0 and 100"
 *       401:
 *         $ref: "#/components/responses/UnauthorizedError"
 *
 *       403:
 *         $ref: "#/components/responses/ForbiddenError"
 */
discountRouter.post('/', validateToken, receptionistGuard, ...createDiscountDTO, createDiscount);

/**
 * @swagger
 * /discounts/{id}:
 *   patch:
 *     summary: Update an existing discount by its ID
 *     tags: [Discounts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Discount ID to update
 *         required: true
 *         schema:
 *           type: string
 *           example: "60c72b2f9b1d8b8f1c8e4d0c"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the discount
 *                 example: "Summer Sale"
 *               percentage:
 *                 type: number
 *                 description: Discount percentage (must be between 0 and 100)
 *                 example: 15
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/responses/Discount"
 *
 *       400:
 *         description: Invalid data provided or discount not found
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
 *                   example: "Discount with such id not found or invalid data provided"
 *       401:
 *         $ref: "#/components/responses/UnauthorizedError"
 *
 *       403:
 *         $ref: "#/components/responses/ForbiddenError"
 *
 *       404:
 *         $ref: "#/components/responses/NotFoundError"
 */
discountRouter.patch('/:id', validateToken, receptionistGuard, checkDiscountExist, ...updateDiscountDTO, updateDiscount);

/**
 * @swagger
 * /discounts/{id}:
 *   delete:
 *     summary: Delete a discount by its ID
 *     tags: [Discounts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Discount ID to be deleted
 *         required: true
 *         schema:
 *           type: string
 *           example: "60c72b2f9b1d8b8f1c8e4d0c"
 *     responses:
 *       200:
 *         description: Discount deleted successfully
 *
 *       401:
 *         $ref: "#/components/responses/UnauthorizedError"
 *
 *       403:
 *         $ref: "#/components/responses/ForbiddenError"
 *
 *       404:
 *         $ref: "#/components/responses/NotFoundError"
 */
discountRouter.delete('/:id', validateToken, receptionistGuard, checkDiscountExist, deleteDiscount);

export default discountRouter;