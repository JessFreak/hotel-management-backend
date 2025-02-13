import mongoose from 'mongoose';

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

const ClientDiscount = mongoose.model('client_discounts', clientDiscountSchema);

export default ClientDiscount;
