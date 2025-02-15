import { param } from 'express-validator';
import { errorHandlerDTO } from './errorHandlerDTO.js';

export const changeStatusDTO = [
  param('status')
    .notEmpty().withMessage('Status is required')
    .isIn(['checked-in', 'checked-out', 'cancelled'])
    .withMessage('Status must be one of the following: checked-in, checked-out, cancelled'),
  errorHandlerDTO,
];
