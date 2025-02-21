import Room from '../models/Room.js';
import createError from 'http-errors';
import { getCleanObject } from '../utils.js';
import Reservation from '../models/Reservation.js';

export const createRoom = async (req, res, next) => {
  const { number, capacity, comfortLevel, price } = req.body;

  const existingRoom = await Room.findOne({ number });
  if (existingRoom) {
    return next(createError(400, 'Room with such number already exists'));
  }

  const newRoom = new Room({
    number,
    capacity,
    comfortLevel,
    price,
  });

  await newRoom.save();

  res.status(201).json(newRoom);
};

export const getRooms = async (req, res) => {
  const { capacity, comfortLevel, minPrice, maxPrice, isAvailable } = req.query;

  const filter = getCleanObject({
    capacity,
    comfortLevel,
    price: { $gte: minPrice || 0, $lte: maxPrice },
  });

  const rooms = isAvailable
    ? await roomsByIsAvailable(isAvailable, filter)
    : await Room.find(filter);

  res.status(200).json(rooms);
};

export const getRoomByNumber = async (req, res) => {
  const { number } = req.params;

  const room = await Room.findOne({ number });
  res.status(200).json(room);
};

export const updateRoom = async (req, res) => {
  const { number } = req.params;
  const { capacity, comfortLevel, price } = req.body;

  const room = await Room.findOneAndUpdate(
    { number },
    { capacity, comfortLevel, price },
    { new: true }
  );

  res.status(200).json(room);
};

export const deleteRoom = async (req, res) => {
  const { number } = req.params;

  await Room.findOneAndDelete({ number });

  res.status(200).json({});
};

export const isRoomAvailable = async (roomNumber) => {
  const room = await Room.findOne({ number: roomNumber });
  const reservationsInRoom = await Reservation.countDocuments({
    roomNumber,
    status: { $in: ['reserved', 'checked-in'] },
  });

  return reservationsInRoom < room.capacity;
}

const roomsByIsAvailable = async (isAvailable, filter) => {
  return Room.aggregate([
    { $match: filter },
    {
      $lookup: {
        from: 'reservations',
        localField: 'number',
        foreignField: 'roomNumber',
        as: 'reservations',
      },
    },
    {
      $addFields: {
        activeReservations: {
          $size: {
            $filter: {
              input: '$reservations',
              as: 'reservation',
              cond: { $in: ['$$reservation.status', ['reserved', 'checked-in']] },
            },
          },
        },
      },
    },
    {
      $match: {
        $expr: isAvailable === 'true'
          ? { $lt: ['$activeReservations', '$capacity'] }
          : { $gte: ['$activeReservations', '$capacity'] },
      },
    },
    { $project: { reservations: 0, activeReservations: 0 } },
  ]);
}