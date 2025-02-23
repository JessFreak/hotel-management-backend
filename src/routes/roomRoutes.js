import express from 'express';
import { validateToken } from '../middlewares/validateToken.js';
import { filterRoomsDTO } from '../middlewares/dtos/filterRoomsDTO.js';
import { createRoomDTO, updateRoomDTO } from '../middlewares/dtos/roomDTO.js';
import { createRoom, deleteRoom, getRoomByNumber, getRooms, updateRoom } from '../controllers/roomController.js';
import { checkRoomExists } from '../middlewares/checkRoomExists.js';
import { receptionistGuard } from '../middlewares/receptionistGuard.js';

const roomRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: Rooms management routes
 */

/**
 * @swagger
 * /rooms:
 *   get:
 *     summary: Get filtered list of rooms
 *     tags: [Rooms]
 *     parameters:
 *       - name: capacity
 *         in: query
 *         description: Filter rooms by capacity
 *         required: false
 *         schema:
 *           type: integer
 *           example: 2
 *       - name: comfortLevel
 *         in: query
 *         description: Filter rooms by comfort level
 *         required: false
 *         schema:
 *           type: string
 *           enum: ['luxury', 'semi-luxury', 'standard']
 *           example: "luxury"
 *       - name: minPrice
 *         in: query
 *         description: Filter rooms by minimum price
 *         required: false
 *         schema:
 *           type: number
 *           format: float
 *           example: 100
 *       - name: maxPrice
 *         in: query
 *         description: Filter rooms by maximum price
 *         required: false
 *         schema:
 *           type: number
 *           format: float
 *           example: 500
 *       - name: isAvailable
 *         in: query
 *         description: Filter rooms by availability status (true/false)
 *         required: false
 *         schema:
 *           type: boolean
 *           example: true
 *     responses:
 *       200:
 *         description: A list of rooms that match the filter criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/responses/Room"
 *       400:
 *         description: Invalid filter parameters
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
 *                   example: "Capacity must be a positive integer"
 */
roomRouter.get('/', ...filterRoomsDTO, getRooms);

/**
 * @swagger
 * /rooms/{number}:
 *   get:
 *     summary: Get a room by its number
 *     tags: [Rooms]
 *     parameters:
 *       - name: number
 *         in: path
 *         description: Room number
 *         required: true
 *         schema:
 *           type: integer
 *           example: 101
 *     responses:
 *       200:
 *         $ref: "#/components/responses/Room"
 *       404:
 *         description: Room not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Room with such number not found"
 */
roomRouter.get('/:number', checkRoomExists, getRoomByNumber);

/**
 * @swagger
 * /rooms:
 *   post:
 *     summary: Create a new room
 *     tags: [Rooms]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: integer
 *                 description: Room number
 *                 example: 101
 *               capacity:
 *                 type: integer
 *                 description: Capacity of the room
 *                 example: 2
 *               comfortLevel:
 *                 type: string
 *                 enum: ['luxury', 'semi-luxury', 'standard']
 *                 description: Comfort level of the room
 *                 example: 'luxury'
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Price of the room
 *                 example: 100.5
 *             required:
 *               - number
 *               - capacity
 *               - comfortLevel
 *               - price
 *     responses:
 *       201:
 *         description: Room created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/responses/Room"
 *       400:
 *         description: Room with such number already exists
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
 *                   example: "Room with such number already exists"
 *       401:
 *         $ref: "#/components/responses/UnauthorizedError"
 *
 *       403:
 *         description: Access forbidden Receptionist only
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 403
 *                 message:
 *                   type: string
 *                   example: "Access forbidden: Receptionist only"
 */
roomRouter.post('/', validateToken, receptionistGuard, ...createRoomDTO, createRoom);

/**
 * @swagger
 * /rooms/{number}:
 *   patch:
 *     summary: Update room details by room number
 *     tags: [Rooms]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: number
 *         in: path
 *         description: Room number to be updated
 *         required: true
 *         schema:
 *           type: integer
 *           example: 101
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: integer
 *                 description: Room number
 *                 example: 101
 *               capacity:
 *                 type: integer
 *                 description: Room capacity
 *                 example: 2
 *               comfortLevel:
 *                 type: string
 *                 enum: ['luxury', 'semi-luxury', 'standard']
 *                 description: Room comfort level
 *                 example: 'luxury'
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Room price
 *                 example: 150
 *             required:
 *               - number
 *     responses:
 *       200:
 *         $ref: "#/components/responses/Room"
 *
 *       400:
 *         description: Room with such number does not exist or invalid data provided
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
 *                   example: "Room with such number does not exist or invalid data provided"
 *       401:
 *         $ref: "#/components/responses/UnauthorizedError"
 *
 *       403:
 *         description: Access forbidden Receptionist only
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 403
 *                 message:
 *                   type: string
 *                   example: "Access forbidden: Receptionist only"
 *       404:
 *         description: Room not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Room not found"
 */
roomRouter.patch('/:number', validateToken, receptionistGuard, checkRoomExists, ...updateRoomDTO, updateRoom);

/**
 * @swagger
 * /rooms/{number}:
 *   delete:
 *     summary: Delete a room by room number
 *     tags: [Rooms]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: number
 *         in: path
 *         description: Room number to be deleted
 *         required: true
 *         schema:
 *           type: integer
 *           example: 101
 *     responses:
 *       200:
 *         description: Room deleted successfully
 *
 *       400:
 *         description: Room with such number does not exist
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
 *                   example: "Room with such number does not exist"
 *       401:
 *         $ref: "#/components/responses/UnauthorizedError"
 *
 *       403:
 *         description: Access forbidden Receptionist only
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 403
 *                 message:
 *                   type: string
 *                   example: "Access forbidden: Receptionist only"
 *       404:
 *         description: Room not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Room not found"
 */
roomRouter.delete('/:number', validateToken, receptionistGuard, checkRoomExists, deleteRoom);

export default roomRouter;
