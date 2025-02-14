import mongoose from 'mongoose';
import { toJSONTransform } from '../utils.js';

const roomSchema = new mongoose.Schema({
  number: {
    type: Number,
    unique: true,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
    min: 1,
    validate: {
      validator: Number.isInteger,
      message: 'Room number must be an integer',
    }
  },
  comfortLevel: {
    type: String,
    enum: ['luxury', 'semi-luxury', 'standard'],
    required: true
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  }
});

toJSONTransform(roomSchema);

const Room = mongoose.model('rooms', roomSchema);

export default Room;
