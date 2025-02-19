import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import User from '../models/User.js';

export const validateToken = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    return next(createError(401, 'User is not authorized'));
  }

  jwt.verify(accessToken, process.env.JWT_SECERT, async (err, { user: { id }}) => {
    if (err) next(createError(401, 'Access token is not valid'));

    const user = await User.findById(id);
    if (!user) next(createError(404, 'User not found'));

    req.user = user;
    next();
  });
};
