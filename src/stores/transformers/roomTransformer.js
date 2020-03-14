import {
  getValue,
  filterUndefined,
  wrapPaginate,
  getCurrentSchool,
} from 'helpers';

export const transform = (data, pagination) => {
  return data.map(item => {
    const sanitizeRoom = getValue(item, {});

    const serializedData = {
      id: getValue(sanitizeRoom.id),
      name: getValue(sanitizeRoom.name),
      capacity: getValue(sanitizeRoom.capacity),
      schoolId: getValue(sanitizeRoom.school_id),
    };

    if (pagination) {
      return wrapPaginate(serializedData, pagination);
    }

    return serializedData;
  });
};

export const transformToSave = (data = {}) => {
  return filterUndefined({
    id: getValue(data.id, undefined),
    name: getValue(data.name, undefined),
    capacity: getValue(data.capacity, undefined),
    school_id: getCurrentSchool(),
  });
};
