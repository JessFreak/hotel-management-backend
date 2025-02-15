import createError from 'http-errors';
import Reservation from '../models/Reservation.js';

export const checkReservationExist = async (req, res, next) => {
  const { id } = req.params;

  const reservation = await Reservation.findById(id);
  if (!reservation) {
    return next(createError(404, 'Reservation with such id not found'));
  }

  next();
};
