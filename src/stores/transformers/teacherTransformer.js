import { getValue, wrapPaginate } from 'helpers';

export const transform = (data, pagination) => {
  const serializedData = data.map(item => {
    const sanitizeItem = getValue(item, {});
    const sanitizeUser = getValue(sanitizeItem.user, {});
    return {
      id: getValue(sanitizeItem.id),
      name: getValue(sanitizeUser.name),
      email: getValue(sanitizeUser.email),
      schoolId: getValue(sanitizeUser.school_id),
    };
  });

  if (pagination) {
    return wrapPaginate(serializedData, pagination);
  }
};
