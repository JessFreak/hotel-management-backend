import express from 'express';
import { validateToken } from '../middlewares/validateToken.js';
import { filterRoomsDTO } from '../middlewares/dtos/filterRoomsDTO.js';
import { createRoomDTO, updateRoomDTO } from '../middlewares/dtos/roomDTO.js';
import { createRoom, deleteRoom, getRoomByNumber, getRooms, updateRoom } from '../controllers/roomController.js';
import { checkRoomExists } from '../middlewares/checkRoomExists.js';
import { receptionistGuard } from '../middlewares/receptionistGuard.js';

const roomRouter = express.Router();

roomRouter.get('/', ...filterRoomsDTO, getRooms);

roomRouter.get('/:number', checkRoomExists, getRoomByNumber);

roomRouter.post('/', validateToken, receptionistGuard,...createRoomDTO, createRoom);

roomRouter.patch('/:number', validateToken, receptionistGuard, checkRoomExists, ...updateRoomDTO, updateRoom);

roomRouter.delete('/:number', validateToken, receptionistGuard, checkRoomExists, deleteRoom);

export default roomRouter;
