import { instanceOf } from 'prop-types';

Object.filter = (obj, predicate) =>
  Object.keys(obj)
    .filter(key => predicate(obj[key]))
    .reduce((res, key) => ((res[key] = obj[key]), res), {});

export const getValue = (data, defaultValue) => {
  if (data && typeof data === 'object') {
    if (data.hasOwnProperty('options')) {
      if (data.options.check === false) {
        return data.value;
      }
    }
  }
  if (data && data !== 'null') {
    return data;
  }

  return defaultValue === undefined ? undefined : defaultValue || null;
};

export const filterUndefined = obj => {
  return Object.filter(obj, value => value !== undefined);
};
