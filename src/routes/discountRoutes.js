import express from 'express';
import { validateToken } from '../middlewares/validateToken.js';
import { receptionistGuard } from '../middlewares/receptionistGuard.js';
import {
  createDiscount,
  deleteDiscount,
  getDiscountById,
  getDiscounts,
  updateDiscount
} from '../controllers/discountController.js';
import { createDiscountDTO, updateDiscountDTO } from '../middlewares/dtos/discountDTO.js';
import { checkDiscountExist } from '../middlewares/checkDiscountExist.js';

const discountRouter = express.Router();

discountRouter.get('/', getDiscounts);

discountRouter.get('/:id', checkDiscountExist, getDiscountById);

discountRouter.post('/', validateToken, receptionistGuard, ...createDiscountDTO, createDiscount);

discountRouter.patch('/:id', validateToken, receptionistGuard, checkDiscountExist, ...updateDiscountDTO, updateDiscount);

discountRouter.delete('/:id', validateToken, receptionistGuard, checkDiscountExist, deleteDiscount);

export default discountRouter;