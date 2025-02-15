import Reservation from '../models/Reservation.js';
import Room from '../models/Room.js';
import createError from 'http-errors';
import { getDiscountsByClientId } from './userController.js';

export const getReservations = async (req, res) => {
  const reservations = await Reservation.find({})
    .populate('clientId');

  res.status(200).json(reservations);
}

const getTotalPrice = (reservation, room, discounts) => {
  const { checkIn, checkOut } = reservation;
  const days = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 3600 * 24));
  let totalPrice = days * room.price;

  discounts.forEach(discount => {
    totalPrice -= totalPrice * (discount.percentage / 100);
  });

  return totalPrice;
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

  res.status(200).json({ reservation, totalPrice });
}

export const createReservation = async (req, res) => {
  const { roomNumber, checkIn, note } = req.body;

  const newReservation = new Reservation({
    clientId: req.user.id,
    checkIn,
    note,
    roomNumber,
  });
  await newReservation.save();

  res.status(201).json({});
}

export const changeStatus = async (req, res) => {
  const { id, status } = req.params;

  const reservation = await Reservation.findByIdAndUpdate(
    id, {
      status,
      checkOut: status === 'checked-out' ? new Date() : undefined,
    }, {
      new: true,
    },
  );

  res.status(200).json(reservation);
}