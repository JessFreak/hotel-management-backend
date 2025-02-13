import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import User from '../models/User.js';

export const validateToken = async (req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return next(createError(401, 'User is not authorized'));
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECERT, async (err, { user: { id }}) => {
    if (err) next(createError(401, 'User is not authorized'));

    const user = await User
      .findById(id)
      .select('-password -__v')
      .lean()
    if (!user) next(createError(404, 'User not found'));

    delete user._id;
    user.id = id;

    req.user = user;
    next();
  });
};
