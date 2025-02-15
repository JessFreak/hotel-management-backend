import { body } from 'express-validator';
import { errorHandlerDTO } from './errorHandlerDTO.js';
import { getOptionalDTO } from './getOptionalDTO.js';

const discountDTO = [
  body('name')
    .notEmpty()
    .withMessage('Discount name is required'),
  body('percentage')
    .notEmpty()
    .withMessage('Discount percentage is required')
    .isFloat({ gt: 0, lt: 100 })
    .withMessage('Discount percentage must be a number greater than 0 and less than 100'),
];

export const createDiscountDTO = [
  ...discountDTO,
  errorHandlerDTO,
];

export const updateDiscountDTO = [
  getOptionalDTO(discountDTO),
  errorHandlerDTO,
];
