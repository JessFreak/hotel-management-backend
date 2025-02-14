import { body } from 'express-validator';
import { errorHandlerDTO } from './errorHandlerDTO.js';

export const roomDTO = [
  body('number')
    .notEmpty().withMessage('Room number is required')
    .isInt({ gt: 0 }).withMessage('Room number must be a positive integer'),

  body('capacity')
    .notEmpty().withMessage('Capacity is required')
    .isInt({ gt: 0 }).withMessage('Capacity must be a positive integer'),

  body('comfortLevel')
    .notEmpty().withMessage('Comfort level is required')
    .isIn(['luxury', 'semi-luxury', 'standard']).withMessage('Comfort level must be one enum'),

  body('price')
    .notEmpty().withMessage('Price is required')
    .custom(value => value > 0).withMessage('Price must be a positive number'),
];

export const createRoomDTO = [
  ...roomDTO,
  errorHandlerDTO,
];

export const updateRoomDTO = [
  ...roomDTO.map(validation => body(validation.builder.fields[0]).optional().custom((value, { req }) => {
    return validation.run(req);
  })),
  errorHandlerDTO,
];

