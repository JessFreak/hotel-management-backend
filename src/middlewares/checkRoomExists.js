import createError from 'http-errors';
import Room from '../models/Room.js';

export const checkRoomExists = async (req, res, next) => {
  const { number } = req.params;

  const room = await Room.findOne({ number });
  if (!room) {
    return next(createError(404, 'Room with such number not found'));
  }

  next();
};
