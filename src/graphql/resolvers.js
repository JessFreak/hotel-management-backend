import User from '../models/User.js';
import Room from '../models/Room.js';
import Reservation from '../models/Reservation.js';

const resolvers = {
  Query: {
    users: async () => User.find({}),
    user: async (_, { id }) => User.findById(id),

    rooms: async () => Room.find({}),
    room: async (_, { number }) => Room.findOne({ number }),

    reservations: async () => Reservation.find({}),
    reservation: async (_, { id }) => Reservation.findById(id),
  },

  Mutation: {
    addUser: async (_, { firstName, lastName, middleName, passportNumber, email, password, role }) => {
      const user = new User({ firstName, lastName, middleName, passportNumber, email, password, role });
      return await user.save();
    },
    updateUser: async (_, { id, ...updates }) => User.findByIdAndUpdate(id, updates, { new: true }),
    deleteUser: async (_, { id }) => User.findByIdAndDelete(id),

    addRoom: async (_, { number, capacity, comfortLevel, price }) => {
      const room = new Room({ number, capacity, comfortLevel, price });
      return await room.save();
    },
    updateRoom: async (_, { number, ...updates }) => Room.findOneAndUpdate({ number }, updates, { new: true }),
    deleteRoom: async (_, { number }) => Room.findOneAndDelete({ number }),

    addReservation: async (_, { clientId, roomNumber, checkIn, checkOut, note, status }) => {
      const reservation = new Reservation({ clientId, roomNumber, checkIn, checkOut, note, status });
      return await reservation.save();
    },
    updateReservation: async (_, { id, ...updates }) => Reservation.findByIdAndUpdate(id, updates, { new: true }),
    deleteReservation: async (_, { id }) => Reservation.findByIdAndDelete(id),
  },

  Reservation: {
    client: async (parent) => User.findById(parent.clientId),
    room: async (parent) => Room.findOne({ number: parent.roomNumber }),
  },
};

export default resolvers;
