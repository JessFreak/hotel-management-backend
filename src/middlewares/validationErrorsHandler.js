import { validationResult } from 'express-validator';
import createError from 'http-errors';

export const validationErrorsHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(createError(400, `Validation errors: ${errors.array().map(e => e.msg).join(', ')}`));
  }
  next();
}
