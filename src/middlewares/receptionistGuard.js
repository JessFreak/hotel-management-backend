import createError from 'http-errors';

export const receptionistGuard = (req, res, next) => {
  const user = req.user;

  if (user.role !== 'receptionist') {
    return next(createError(403, 'Access forbidden: Receptionist only'));
  }

  next();
};
