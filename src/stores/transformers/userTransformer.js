import { filterUndefined, getValue, wrapPaginate } from 'helpers';

export const transform = (data, pagination) => {
  return wrapPaginate(
    data.map(item => {
      const serializedUser = getValue(item, {});

      return {
        id: getValue(serializedUser.id),
        name: getValue(serializedUser.name),
        lastName: getValue(serializedUser.last_name),
        email: getValue(serializedUser.email),
        address: getValue(serializedUser.address),
        phone: getValue(serializedUser.phone),
        birthday: getValue(serializedUser.birthday),
        bloodGroup: getValue(serializedUser.blood_group),
        gender: getValue(serializedUser.gender),
        marital: getValue(serializedUser.marital),
        role: getValue(serializedUser.roles),
      };
    }),
    pagination
  );
};

export const transformToSave = data => {
  return filterUndefined({
    id: getValue(data.id),
    name: getValue(data.name, undefined),
    last_name: getValue(data.lastName, undefined),
    phone: getValue(data.phone, undefined),
    address: getValue(data.address, undefined),
    email: getValue(data.email, undefined),
    gender: getValue(data.gender, undefined),
    birthday: getValue(data.birthday, undefined),
    blood_group: getValue(data.bloodGroup, undefined),
    marital: getValue(data.marital, undefined),
    role: getValue(data.role, undefined),
    password: getValue(data.password, undefined),
  });
};
