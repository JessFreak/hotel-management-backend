import Discount from '../models/Discount.js';

export const getDiscounts = async (req, res) => {
  const discounts = await Discount.find({});
  
  res.status(200).json(discounts);
}

export const getDiscountById = async (req, res) => {
  const { id } = req.params;
  const discount = await Discount.findById(id);

  res.status(200).json(discount);
}

export const createDiscount = async (req, res) => {
  const { name, percentage } = req.body;

  const discount = new Discount({ name, percentage });
  await discount.save();

  res.status(201).json(discount);
}

export const updateDiscount = async (req, res) => {
  const { id } = req.params;
  const { name, percentage } = req.body;

  const discount = await Discount.findByIdAndUpdate(id, { name, percentage }, { new: true });

  res.status(200).json(discount);
}

export const deleteDiscount = async (req, res) => {
  const { id } = req.params;
  await Discount.findByIdAndDelete(id);

  res.status(200).json({});
}