import { getValue } from 'helpers';

export const transform = data => {
  return data.map(item => {
    const sanitizeItem = getValue(item, {});
    const sanitizeUser = getValue(item.user, {});
    return {
      id: getValue(sanitizeItem.id),
      name: getValue(sanitizeUser.name),
      email: getValue(sanitizeUser.email),
    };
  });
};
