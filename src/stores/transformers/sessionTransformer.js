import { getValue, filterUndefined } from 'helpers';

export const transform = data => {
  return data.map(item => {
    const sanitizeClasses = getValue(item, {});

    return {
      id: getValue(sanitizeClasses.id),
      name: getValue(sanitizeClasses.name),
      status: getValue(sanitizeClasses.status),
      schoolId: getValue(sanitizeClasses.school_id),
    };
  });
};

export const transformToUpdate = (data = {}) => {
  return filterUndefined({
    id: getValue(data.id, null),
    name: getValue(data.name, undefined),
    status: getValue(data.status, undefined),
    school_id: getValue(data.schoolId, undefined),
  });
};

export const transformToCreate = (data = {}) => {
  return filterUndefined({
    name: getValue(data.session, undefined),
    status: getValue(data.status, undefined),
    school_id: getValue(data.schoolId, undefined),
  });
};
