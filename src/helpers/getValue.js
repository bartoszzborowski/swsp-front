export const getValue = (data, defaultValue) => {
  if (data && data !== 'null') {
    return data;
  }

  return defaultValue === undefined ? undefined : defaultValue || null;
};
