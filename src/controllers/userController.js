import User from '../models/User.js';
import ClientDiscount from '../models/ClientDiscount.js';
import createError from 'http-errors';

export const getUsers = async (req, res) => {
  const users = await User.find({});

  res.status(200).json(users);
}

export const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  res.status(200).json(user);
}

export const getDiscountsByClientId = async (clientId) => {
  const discounts = await ClientDiscount.find({ clientId })
    .populate('discountId', 'name percentage')
    .select('discountId')
    .lean();
  return discounts.map(d => d.discountId);
}

export const getUserDiscounts = async (req, res) => {
  const { id } = req.params;

  const discounts = await getDiscountsByClientId(id);

  res.status(200).json(discounts);
};


export const addUserDiscount = async (req, res, next) => {
  const { id } = req.params;
  const { discountId } = req.query;

  const existingDiscount = await ClientDiscount.findOne({ clientId: id, discountId });
  if (existingDiscount) {
    return next(createError(400, 'User already has this discount'));
  }

  const newUserDiscount = new ClientDiscount({ clientId: id, discountId });
  await newUserDiscount.save();

  res.status(201).json();
}