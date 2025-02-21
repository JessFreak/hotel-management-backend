import { query } from 'express-validator';
import { errorHandlerDTO } from './errorHandlerDTO.js';

export const filterReservationsDTO = [
  query('roomNumber')
    .optional()
    .isInt({ gt: 0 }).withMessage('Room number must be a positive integer'),

  query('clientId')
    .optional()
    .isMongoId().withMessage('clientId must be a valid MongoDB ObjectId'),

  query('status')
    .optional()
    .isIn(['reserved', 'checked-in', 'checked-out', 'cancelled'])
    .withMessage('Status must be one of the allowed values (reserved, checked-in, checked-out, cancelled)'),

  query('checkIn')
    .optional()
    .isISO8601().withMessage('checkIn must be a valid date in ISO format'),

  query('checkOut')
    .optional()
    .isISO8601().withMessage('checkOut must be a valid date in ISO format'),

  query('my')
    .optional()
    .isBoolean().withMessage('my must be a boolean'),

  errorHandlerDTO,
];
