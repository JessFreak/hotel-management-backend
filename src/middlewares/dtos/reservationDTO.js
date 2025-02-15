import { body } from 'express-validator';
import Room from '../../models/Room.js';
import { errorHandlerDTO } from './errorHandlerDTO.js';

export const createReservationDTO = [
  body('roomNumber')
    .notEmpty().withMessage('Room number is required')
    .isInt({ gt: 0 }).withMessage('Room number must be a positive integer')
    .custom(async (number) => {
      const room = await Room.findOne({ number });
      if (!room) {
        throw new Error('Room with such number does not exist');
      }
    }),

  body('checkIn')
    .notEmpty().withMessage('Check-in date is required')
    .isISO8601().withMessage('Check-in date must be a valid date'),

  body('note')
    .optional()
    .isString().withMessage('Note must be a string')
    .isLength({ max: 500 }).withMessage('Note must not exceed 500 characters'),

  errorHandlerDTO,
];
