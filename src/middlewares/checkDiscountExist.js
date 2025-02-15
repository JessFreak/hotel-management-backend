import createError from 'http-errors';
import Discount from '../models/Discount.js';

export const checkDiscountExist = async (req, res, next) => {
  const id = req.query.discountId || req.params.id;

  const discount = await Discount.findById(id);
  if (!discount) {
    return next(createError(404, 'Discount with such id not found'));
  }

  next();
};
