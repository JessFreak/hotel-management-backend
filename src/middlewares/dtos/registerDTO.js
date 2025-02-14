import { body } from 'express-validator';
import { loginDTO } from './loginDTO.js';

export const registerDTO = [
  body('firstName')
    .notEmpty().withMessage('First name is required'),

  body('lastName')
    .notEmpty().withMessage('Last name is required'),

  body('passportNumber')
    .notEmpty().withMessage('Passport number is required')
    .isLength({ min: 6 }).withMessage('Passport number must be at least 6 characters long'),
    ...loginDTO,
];
