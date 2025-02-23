export const roomResponse = {
  description: 'Room object',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Unique identifier of the room',
            example: '60c72b2f9b1d8b8f1c8e4d0c',
          },
          number: {
            type: 'integer',
            description: 'Room number',
            example: 101,
          },
          capacity: {
            type: 'integer',
            description: 'Maximum capacity of people the room can accommodate',
            example: 2,
          },
          comfortLevel: {
            type: 'string',
            enum: ['luxury', 'semi-luxury', 'standard'],
            description: 'The level of comfort provided by the room',
            example: 'luxury',
          },
          price: {
            type: 'number',
            description: 'Price per night for the room',
            example: 200,
          },
        },
        required: ['number', 'capacity', 'comfortLevel', 'price'],
      },
    },
  },
};
