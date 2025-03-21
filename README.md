# Hotel Management Backend

## Description

This project is a backend system for automating hotel accounting and reservation management. It covers the financial and operational aspects of hotel management, including:
- Managing clients (storing personal information, passport data, comments, etc.)
- Managing rooms (number, capacity, comfort level, price, etc.)
- Handling reservations (booking, check-in, check-out, cancellation, etc.)
- Applying discounts for loyal or special-category clients

### Technologies used
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT

## Project setup

### Prerequisites
- Node.js 16.14.0 or higher
- npm 8.1.0 or higher

### Clone the repository
```bash
$ git clone https://github.com/JessFreak/hotel-management-backend.git
$ cd hotel-management-backend 
```

### Environment setup

Create a `.env` file in the root directory of the project and add the following environment variables:
- `DB_URI`: The connection string for your MongoDB database (e.g. `mongodb://localhost:27017/hotel-management`).
- `PORT`: The port number on which the server will listen (e.g. `3000`).
- `JWT_SECRET`: The secret key used for signing and verifying JWT tokens (e.g. `mysecretkey`).

### Install dependencies
```bash
$ npm install
```

### Run the project

```bash
$ npm start
```

## API Documentation (Swagger)

To view the API documentation for this project, you can use Swagger. 
It provides an interactive interface to explore the available endpoints and their usage.

### Accessing the documentation
Once the project is running, open your browser and go to the following URL to access the documentation:

```bash
$ http://localhost:PORT/api-docs
```

This will display the API documentation, including information about the available routes, request/response formats, and more.

## GraphQL
This project includes a GraphQL API powered by Apollo Server. It allows querying and mutating User, Room, and Reservation data efficiently. 

### Accessing the GraphQL Playground
Once the project is running, open your browser and go to the following URL to access the GraphQL:

```bash
$ http://localhost:PORT/graphql
```
