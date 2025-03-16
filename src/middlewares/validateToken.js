import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import User from '../models/User.js';

export const validateToken = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    return next(createError(401, 'User is not authorized'));
  }

  jwt.verify(accessToken, process.env.JWT_SECERT, async (err, decoded) => {
    if (err) return next(createError(401, 'Access token is not valid'));

    if (!decoded || !decoded.user || !decoded.user.id) {
      return next(createError(401, 'Access token is not valid'));
    }

    const user = await User.findById(decoded.user.id);
    if (!user) return next(createError(404, 'User not found'));

    req.user = user;
    next();
  });
};
