import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    middleName: String
    passportNumber: String!
    email: String!
    role: String!
  }

  type Room {
    id: ID!
    number: Int!
    capacity: Int!
    comfortLevel: String!
    price: Float!
  }

  type Reservation {
    id: ID!
    client: User!
    room: Room!
    checkIn: String!
    checkOut: String
    note: String
    status: String!
  }

  type Query {
    users: [User]
    user(id: ID!): User
    rooms: [Room]
    room(number: Int!): Room
    reservations: [Reservation]
    reservation(id: ID!): Reservation
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, middleName: String, passportNumber: String!, email: String!, password: String!, role: String): User
    updateUser(id: ID!, firstName: String, lastName: String, middleName: String, passportNumber: String, email: String, role: String): User
    deleteUser(id: ID!): User

    addRoom(number: Int!, capacity: Int!, comfortLevel: String!, price: Float!): Room
    updateRoom(number: Int!, capacity: Int, comfortLevel: String, price: Float): Room
    deleteRoom(number: Int!): Room

    addReservation(clientId: ID!, roomNumber: Int!, checkIn: String!, checkOut: String, note: String, status: String): Reservation
    updateReservation(id: ID!, checkIn: String, checkOut: String, note: String, status: String): Reservation
    deleteReservation(id: ID!): Reservation
  }
`;

export default typeDefs;
