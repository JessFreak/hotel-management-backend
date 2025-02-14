import express from 'express';
import { validateToken } from '../middlewares/validateToken.js';
import { createRoomDTO, updateRoomDTO } from '../middlewares/dtos/roomDTO.js';
import { createRoom, deleteRoom, getRoomByNumber, getRooms, updateRoom } from '../controllers/roomController.js';
import { checkRoomExists } from '../middlewares/roomById.js';

const router = express.Router();

router.get('/', getRooms);

router.get('/:number', checkRoomExists, getRoomByNumber);

router.post('/', validateToken, ...createRoomDTO, createRoom);

router.patch('/:number', validateToken, checkRoomExists,...updateRoomDTO, updateRoom);

router.delete('/:number', validateToken, checkRoomExists, deleteRoom);

export default router;
