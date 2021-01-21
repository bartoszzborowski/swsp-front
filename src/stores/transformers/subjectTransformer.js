import { filterUndefined, getCurrentSchool, getValue } from 'helpers';

export const transform = data => {
  return data.map(item => {
    const sanitizeSubject = getValue(item, {});

    return {
      id: getValue(sanitizeSubject.id),
      name: getValue(sanitizeSubject.name),
    };
  });
};

export const transformToSave = data => {
  return filterUndefined({
    id: getValue(data.id),
    name: getValue(data.name),
    school_id: getCurrentSchool(),
  });
};
