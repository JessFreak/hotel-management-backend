import createError from 'http-errors';
import User from '../models/User.js';

export const checkUserExist = async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) {
    return next(createError(404, 'User with such number not found'));
  }

  next();
};
