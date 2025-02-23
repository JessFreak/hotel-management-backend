export const roomResponse = {
  description: 'Room object',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          number: {
            type: 'integer',
            example: 101
          },
          capacity: {
            type: 'integer',
            example: 2
          },
          comfortLevel: {
            type: 'string',
            enum: ['luxury', 'semi-luxury', 'standard'],
            example: 'luxury'
          },
          price: {
            type: 'number',
            example: 200
          }
        },
        required: ['number', 'capacity', 'comfortLevel', 'price']
      }
    }
  }
};
