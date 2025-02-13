import mongoose from 'mongoose';

const discountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  percentage: {
    type: mongoose.Types.Decimal128,
    required: true
  }
});

const Discount = mongoose.model('discounts', discountSchema);

export default Discount;
