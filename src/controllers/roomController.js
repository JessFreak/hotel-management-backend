import Room from '../models/Room.js';
import createError from 'http-errors';

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
  const rooms = await Room.find();

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
