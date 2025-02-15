import { Router } from 'express';
import { checkDiscountExist } from '../middlewares/checkDiscountExist.js';
import { checkUserExist } from '../middlewares/checkUserExist.js';
import { addUserDiscount, getUserById, getUserDiscounts, getUsers } from '../controllers/userController.js';
import { receptionistGuard } from '../middlewares/receptionistGuard.js';
import { validateToken } from '../middlewares/validateToken.js';

const userRouter = Router();

userRouter.get('/', validateToken, receptionistGuard, getUsers);

userRouter.get('/:id', validateToken, receptionistGuard, checkUserExist, getUserById);

userRouter.get('/:id/discounts', validateToken, receptionistGuard, checkUserExist, getUserDiscounts);

userRouter.post('/:id/discounts', validateToken, receptionistGuard, checkUserExist, checkDiscountExist, addUserDiscount);

export default userRouter;