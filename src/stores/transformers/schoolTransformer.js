import { getValue, filterUndefined, wrapPaginate } from 'helpers';

export const transform = (data, pagination) => {
  return data.map(item => {
    const sanitizeSection = getValue(item, {});

    const serializedData = {
      id: getValue(sanitizeSection.id),
      name: getValue(sanitizeSection.name),
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
  });
};
