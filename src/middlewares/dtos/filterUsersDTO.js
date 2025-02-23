import { query } from 'express-validator';
import { errorHandlerDTO } from './errorHandlerDTO.js';

export const filterUsersDTO = [
  query('email')
    .optional()
    .isEmail().withMessage('Invalid email format'),

  query('name')
    .optional()
    .isString().withMessage('name must be a string'),

  query('passportNumber')
    .optional()
    .isString().withMessage('passportNumber must be a string'),

  query('role')
    .optional()
    .isIn(['receptionist', 'client']).withMessage('role must be enum (receptionist, client)'),
  errorHandlerDTO,
];