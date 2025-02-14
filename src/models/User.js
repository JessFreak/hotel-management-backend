import mongoose from 'mongoose';
import { toJSONTransform } from '../utils.js';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  passportNumber: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['client', 'receptionist'],
    default: 'client',
  }
});

toJSONTransform(userSchema);

const User = mongoose.model('users', userSchema);

export default User;
