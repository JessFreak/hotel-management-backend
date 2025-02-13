import mongoose from 'mongoose';

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
      message: 'Room number does not exist'
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
    trim: true
  }
});

const Reservation = mongoose.model('reservations', reservationSchema);

export default Reservation;
