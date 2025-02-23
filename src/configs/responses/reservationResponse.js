export const reservationResponse = {
  description: 'Reservation object',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      description: 'Unique identifier of the reservation',
      example: '60d34c1f1f1f1f1f1f1f1f1f'
    },
    clientId: {
      $ref: '#/components/schemas/User',
      description: 'Client who made the reservation, using userResponse for detailed client information'
    },
    roomNumber: {
      type: 'integer',
      description: 'Room number of the reserved room',
      example: 101
    },
    checkIn: {
      type: 'string',
      format: 'date-time',
      description: 'Check-in date and time',
      example: '2025-03-01T14:00:00Z'
    },
    checkOut: {
      type: 'string',
      format: 'date-time',
      description: 'Check-out date and time',
      example: '2025-03-05T12:00:00Z'
    },
    note: {
      type: 'string',
      description: 'Additional note or special request for the reservation',
      example: 'Late check-in request'
    },
    status: {
      type: 'string',
      enum: ['reserved', 'checked-in', 'checked-out', 'cancelled'],
      description: 'Current status of the reservation',
      example: 'reserved'
    }
  },
  required: ['clientId', 'roomNumber', 'checkIn', 'status'],
};
