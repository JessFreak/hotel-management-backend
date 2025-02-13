import User from '../models/User.js';
import createError from 'http-errors';

export const validateUniqueUser = async (req, res, next) => {
  const { passportNumber, email } = req.body;

  const existingUserByPassport = await User.findOne({ passportNumber });
  const existingUserByEmail = await User.findOne({ email });

  if (existingUserByPassport) {
    next(createError(400, 'Passport number is already in use'));
  }

  if (existingUserByEmail) {
    next(createError(400, 'Email is already in use'));
  }

  next();
}