import mongoose from 'mongoose';
import { toJSONTransform } from '../utils.js';

const reservationSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  roomNumber: {
    type: Number,
    ref: 'rooms',
    required: true,
    validate: {
      validator: async (value) => {
        const room = await mongoose.model('rooms').findOne({ number: value });
        return room !== null;
      },
      message: 'Room number with such number does not exist'
    }
  },
  checkIn: {
    type: Date,
    required: true
  },
  checkOut: {
    type: Date
  },
  note: {
    type: String,
  },
  status: {
    type: String,
    enum: ['reserved', 'checked-in', 'checked-out', 'cancelled'],
    default: 'reserved'
  }
});

toJSONTransform(reservationSchema);

const Reservation = mongoose.model('reservations', reservationSchema);

export default Reservation;
