import { getValue, filterUndefined, wrapPaginate } from 'helpers';

export const transform = (data, pagination) => {
  return data.map(item => {
    const sanitizeClasses = getValue(item, {});

    const serializedData = {
      id: getValue(sanitizeClasses.id),
      name: getValue(sanitizeClasses.name),
      status: getValue(sanitizeClasses.status),
      schoolId: getValue(sanitizeClasses.school_id),
    };

    if (pagination) {
      return wrapPaginate(serializedData, pagination);
    }

    return serializedData;
  });
};

export const transformToSave = (data = {}) => {
  return filterUndefined({
    id: getValue(data.id, null),
    name: getValue(data.name, undefined),
    status: getValue(data.status, undefined),
    school_id: getValue(data.schoolId, undefined),
  });
};
