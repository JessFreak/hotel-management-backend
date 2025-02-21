import express from 'express';
import { validateToken } from '../middlewares/validateToken.js';
import { receptionistGuard } from '../middlewares/receptionistGuard.js';
import { createReservationDTO } from '../middlewares/dtos/reservationDTO.js';
import {
  changeStatus,
  createReservation,
  getReservationById,
  getReservations
} from '../controllers/reservationController.js';
import { checkReservationExist } from '../middlewares/checkReservationExist.js';
import { changeStatusDTO } from '../middlewares/dtos/changeStatusDTO.js';
import { filterReservationsDTO } from '../middlewares/dtos/filterReservationsDTO.js';

const reservationRouter = express.Router();

reservationRouter.get('/', validateToken, ...filterReservationsDTO, getReservations);

reservationRouter.get('/:id', validateToken, getReservationById);

reservationRouter.post('/', validateToken, ...createReservationDTO, createReservation);

reservationRouter.patch('/:id/:status', validateToken, receptionistGuard, checkReservationExist, ...changeStatusDTO, changeStatus);

export default reservationRouter;