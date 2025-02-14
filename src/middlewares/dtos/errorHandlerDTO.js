import { validationResult } from 'express-validator';
import createError from 'http-errors';

export const errorHandlerDTO = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(createError(400, `Validation errors: ${errors.array().map(e => e.msg).join(', ')}`));
  }
  next();
}
