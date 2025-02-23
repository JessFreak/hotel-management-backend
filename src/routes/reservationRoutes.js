import express from 'express';
import { validateToken } from '../middlewares/validateToken.js';
import { receptionistGuard } from '../middlewares/receptionistGuard.js';
import { createReservationDTO } from '../middlewares/dtos/reservationDTO.js';
import {
  cancelReservation,
  changeReservationStatus,
  createReservation,
  getReservationById,
  getReservations,
} from '../controllers/reservationController.js';
import { checkReservationExist } from '../middlewares/checkReservationExist.js';
import { changeStatusDTO } from '../middlewares/dtos/changeStatusDTO.js';
import { filterReservationsDTO } from '../middlewares/dtos/filterReservationsDTO.js';

const reservationRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: Reservation management routes
 */

/**
 * @swagger
 * /reservations:
 *   get:
 *     summary: Get all reservations
 *     tags: [Reservations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: roomNumber
 *         in: query
 *         description: Room number of the reservation
 *         required: false
 *         schema:
 *           type: integer
 *           example: 101
 *       - name: clientId
 *         in: query
 *         description: Client ID of the reservation holder
 *         required: false
 *         schema:
 *           type: string
 *           format: objectId
 *           example: "60d34c1f1f1f1f1f1f1f1f1f"
 *       - name: status
 *         in: query
 *         description: Status of the reservation
 *         required: false
 *         schema:
 *           type: string
 *           enum: ['reserved', 'checked-in', 'checked-out', 'cancelled']
 *           example: "reserved"
 *       - name: checkIn
 *         in: query
 *         description: Check-in date of the reservation
 *         required: false
 *         schema:
 *           type: string
 *           format: date-time
 *           example: "2025-03-01T14:00:00Z"
 *       - name: checkOut
 *         in: query
 *         description: Check-out date of the reservation
 *         required: false
 *         schema:
 *           type: string
 *           format: date-time
 *           example: "2025-03-05T12:00:00Z"
 *     responses:
 *       200:
 *         description: List of reservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 *       401:
 *         $ref: "#/components/schemas/UnauthorizedError"
 *       403:
 *         $ref: "#/components/schemas/ForbiddenError"
 */
reservationRouter.get('/', validateToken, ...filterReservationsDTO, getReservations);

/**
 * @swagger
 * /reservations/{id}:
 *   get:
 *     summary: Get a specific reservation by ID
 *     tags: [Reservations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the reservation to retrieve
 *         required: true
 *         schema:
 *           type: string
 *           example: "60d34c1f1f1f1f1f1f1f1f1f"
 *     responses:
 *       200:
 *         description: Reservation details with room and total price
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reservation:
 *                   $ref: '#/components/schemas/Reservation'
 *                 room:
 *                   $ref: '#/components/schemas/Room'
 *                 totalPrice:
 *                   description: Total price of the reservation with all discounts
 *                   type: number
 *                   example: 150
 *       401:
 *         $ref: "#/components/schemas/UnauthorizedError"
 *       403:
 *         $ref: "#/components/schemas/ForbiddenError"
 *       404:
 *         $ref: "#/components/schemas/NotFoundError"
 */
reservationRouter.get('/:id', validateToken, checkReservationExist, getReservationById);

/**
 * @swagger
 * /reservations:
 *   post:
 *     summary: Create a new reservation
 *     tags: [Reservations]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomNumber:
 *                 type: integer
 *                 example: 101
 *               checkIn:
 *                 type: string
 *                 format: date
 *                 example: "2025-02-28"
 *               checkOut:
 *                 type: string
 *                 format: date
 *                 example: "2025-03-05"
 *               note:
 *                 type: string
 *                 example: "Needs a quiet room"
 *     responses:
 *       201:
 *         description: Reservation created successfully
 *       400:
 *         description: Invalid reservation details or the room is already reserved or full
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
 *                   example: "You already have a reservation in this room"
 *       401:
 *         $ref: "#/components/schemas/UnauthorizedError"
 *       403:
 *         $ref: "#/components/schemas/ForbiddenError"
 */
reservationRouter.post('/', validateToken, ...createReservationDTO, createReservation);

/**
 * @swagger
 * /reservations/{id}/cancel:
 *   patch:
 *     summary: Cancel a reservation
 *     tags: [Reservations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Reservation ID to be cancelled
 *         required: true
 *         schema:
 *           type: string
 *           example: "60d34c1f1f1f1f1f1f1f1f1f"
 *     responses:
 *       200:
 *         description: Reservation cancelled successfully
 *       400:
 *         description: Invalid reservation ID or unable to cancel reservation
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
 *                   example: "Reservation not found"
 *       401:
 *         $ref: "#/components/schemas/UnauthorizedError"
 *       403:
 *         $ref: "#/components/schemas/ForbiddenError"
 *       404:
 *         $ref: "#/components/schemas/NotFoundError"
 */
reservationRouter.patch('/:id/cancel', validateToken, checkReservationExist, cancelReservation);

/**
 * @swagger
 * /reservations/{id}/{status}:
 *   patch:
 *     summary: Change the status of a reservation
 *     tags: [Reservations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Reservation ID to update
 *         required: true
 *         schema:
 *           type: string
 *           example: "60d34c1f1f1f1f1f1f1f1f1f"
 *       - name: status
 *         in: query
 *         description: New status to update the reservation to
 *         required: true
 *         schema:
 *           type: string
 *           enum: [checked-in, checked-out, cancelled]
 *           example: "checked-out"
 *     responses:
 *       200:
 *         description: Reservation status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Reservation"
 *       400:
 *         description: Invalid status or unable to change reservation status
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
 *                   example: "Invalid reservation status"
 *       401:
 *         $ref: "#/components/schemas/UnauthorizedError"
 *       403:
 *         $ref: "#/components/schemas/ForbiddenError"
 *       404:
 *         $ref: "#/components/schemas/NotFoundError"
 */
reservationRouter.patch('/:id/:status', validateToken, receptionistGuard, checkReservationExist, ...changeStatusDTO, changeReservationStatus);

export default reservationRouter;