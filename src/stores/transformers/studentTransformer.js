import { getValue } from 'helpers';

Object.filter = (obj, predicate) =>
  Object.keys(obj)
    .filter(key => predicate(obj[key]))
    .reduce((res, key) => ((res[key] = obj[key]), res), {});

export const transform = (data, pagination) => {
  return data.map(item => {
    const { user, parent, classes } = item;
    const parentUser = getValue(parent.user, {});
    const studentUser = getValue(user, {});
    const studentClasses = getValue(classes, {});

    return {
      id: getValue(item.id),
      name: getValue(studentUser.name),
      classId: getValue(studentClasses.id),
      className: getValue(studentClasses.name),
      parentName: getValue(parentUser.name),
      birthDay: getValue(studentUser.birthday),
      gender: getValue(studentUser.gender),
      phone: getValue(studentUser.phone),
      session: getValue(null),
    };
  });
};

export const transformToUpdate = data => {
  return Object.filter(
    {
      id: getValue(data.id),
      name: getValue(data.name, undefined),
      phone: getValue(data.phone, undefined),
      address: getValue(data.address, undefined),
      email: getValue(data.email, undefined),
      password: getValue(data.password, undefined),
      blood_group: getValue(data.blood_group, undefined),
      parent_id: getValue(data.parent_id, undefined),
      school_id: getValue(data.school_id, undefined),
    },
    value => value !== undefined
  );
};
