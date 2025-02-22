import Reservation from '../models/Reservation.js';
import Room from '../models/Room.js';
import createError from 'http-errors';
import { getDiscountsByClientId } from './userController.js';
import { getCleanObject, getTotalPrice } from '../utils.js';
import { isRoomAvailable } from './roomController.js';

export const getReservations = async (req, res, next) => {
  const { clientId, status, checkIn, checkOut, roomNumber } = req.query;
  const user = req.user;

  if (user.role !== 'receptionist' && clientId !== user.id) {
    return next(createError(403, 'Access forbidden: Receptionist only'));
  }

  const filter = getCleanObject({
    clientId,
    status,
    checkIn,
    checkOut,
    roomNumber,
  });

  const reservations = await Reservation.find(filter)
    .populate('clientId');

  res.status(200).json(reservations);
}

export const getReservationById = async (req, res, next) => {
  const { id } = req.params;
  const user = req.user;

  const reservation = await Reservation.findById(id)
    .populate('clientId');

  if (user.role !== 'receptionist' && reservation.clientId._id.toString() !== user.id) {
    return next(createError(403, 'Access forbidden: Receptionist only'));
  }

  const room = await Room.findOne({ number: reservation.roomNumber });
  const discounts = await getDiscountsByClientId(user.id);
  const totalPrice = getTotalPrice(reservation, room, discounts);

  res.status(200).json({ reservation, room, totalPrice });
}

export const createReservation = async (req, res, next) => {
  const { roomNumber, checkIn, checkOut, note } = req.body;

  const existingReservation = await Reservation.findOne({
    clientId: req.user.id,
    roomNumber,
    status: { $in: ['reserved', 'checked-in'] },
  });

  if (existingReservation) {
    return next(createError(400, 'You already have a reservation in this room'));
  }

  const isAvailable = await isRoomAvailable(roomNumber);

  if (!isAvailable) {
    return next(createError(400, 'Room is full'));
  }

  const newReservation = new Reservation({
    clientId: req.user.id,
    checkIn,
    checkOut,
    note,
    roomNumber,
  });
  await newReservation.save();

  res.status(201).json({});
}

export const cancelReservation = async (req, res, next) => {
  const { id } = req.params;
  const user = req.user;

  const reservation = await Reservation.findById(id);

  if (reservation.clientId._id.toString() !== user.id) {
    return next(createError(403, 'You do not have permission to cancel this reservation'));
  }

  reservation.status = 'cancelled';
  await reservation.save();

  res.status(200).json({});
}

export const changeReservationStatus = async (req, res) => {
  const { id, status } = req.params;

  const currentReservation = await Reservation.findById(id);
  const reservation = await Reservation.findByIdAndUpdate(
    id, {
      status,
      checkOut: status === 'checked-out' ? new Date() : currentReservation.checkOut,
    }, {
      new: true,
    },
  );

  res.status(200).json(reservation);
}
