export const toJSONTransform = (schema, additionalFieldsToRemove = []) => {
  schema.set('toJSON', {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      additionalFieldsToRemove.forEach(field => delete ret[field]);

      return ret;
    }
  });
};

const DAY = 1000 * 3600 * 24;

export const getTotalPrice = (reservation, room, discounts) => {
  const { checkIn, checkOut } = reservation;
  const days = Math.ceil((new Date(checkOut) - new Date(checkIn)) / DAY);
  let totalPrice = days * room.price;

  discounts.forEach(discount => {
    totalPrice -= totalPrice * (discount.percentage / 100);
  });

  return totalPrice;
}

export const getCleanObject = (obj) => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  const newObj = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    const value = obj[key];
    const cleanedValue = getCleanObject(value);

    if (cleanedValue !== undefined) {
      if (Array.isArray(newObj)) {
        newObj.push(cleanedValue);
      } else {
        newObj[key] = cleanedValue;
      }
    }
  }

  return newObj;
}