import mongoose from 'mongoose';
import { toJSONTransform } from '../utils.js';

const clientDiscountSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'clients',
    required: true
  },
  discountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'discounts',
    required: true
  }
});

toJSONTransform(clientDiscountSchema);

const ClientDiscount = mongoose.model('client_discounts', clientDiscountSchema);

export default ClientDiscount;
