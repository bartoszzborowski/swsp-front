import { getValue } from 'helpers';

export const transform = data => {
  return data.map(item => {
    const sanitizeSubject = getValue(item, {});

    return {
      id: getValue(sanitizeSubject.id),
      name: getValue(sanitizeSubject.name),
    };
  });
};
