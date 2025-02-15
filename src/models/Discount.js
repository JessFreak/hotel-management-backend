import mongoose from 'mongoose';
import { toJSONTransform } from '../utils.js';

const discountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  percentage: {
    type: Number,
    required: true
  }
});

toJSONTransform(discountSchema);

const Discount = mongoose.model('discounts', discountSchema);

export default Discount;
