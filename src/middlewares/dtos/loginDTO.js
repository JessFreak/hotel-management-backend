import { body } from 'express-validator';
import { errorHandlerDTO } from './errorHandlerDTO.js';

export const loginDTO = [
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address'),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  errorHandlerDTO,
];
