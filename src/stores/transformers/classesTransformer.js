import { getValue } from 'helpers';

export const transform = data => {
  return data.map(item => {
    const sanitizeClasses = getValue(item, {});

    return {
      id: getValue(sanitizeClasses.id),
      name: getValue(sanitizeClasses.name),
    };
  });
};
