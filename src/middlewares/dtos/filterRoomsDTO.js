import { query } from 'express-validator';
import { errorHandlerDTO } from './errorHandlerDTO.js';

export const filterRoomsDTO = [
  query('capacity')
    .optional()
    .isInt({ gt: 0 }).withMessage('Capacity must be a positive integer'),

  query('comfortLevel')
    .optional()
    .isIn(['luxury', 'semi-luxury', 'standard']).withMessage('Comfort level must be one of the allowed values'),

  query('minPrice')
    .optional()
    .isFloat({ gt: 0 }).withMessage('PriceMin must be a positive number'),

  query('maxPrice')
    .optional()
    .isFloat({ gt: 0 }).withMessage('PriceMax must be a positive number'),

  query('isAvailable')
    .optional()
    .isBoolean().withMessage('Available must be a boolean'),

  errorHandlerDTO,
];
