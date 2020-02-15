import { filterUndefined, getValue, wrapPaginate } from 'helpers';

export const transform = (data, pagination) => {
  return wrapPaginate(
    data.map(item => {
      const { user, parent, classes } = item;
      const parentUser = getValue(parent.user, {});
      const studentUser = getValue(user, {});
      const studentClasses = getValue(classes, {});

      return {
        id: getValue(item.id),
        name: getValue(studentUser.name),
        classId: getValue(studentClasses.id),
        className: getValue(studentClasses.name),
        parentId: getValue(parent.id),
        parentName: getValue(parentUser.name),
        birthDay: getValue(studentUser.birthday),
        gender: getValue(studentUser.gender),
        phone: getValue(studentUser.phone),
        session: getValue(null),
      };
    }),
    pagination
  );
};

export const searchTransform = data => {
  return data.map(item => {
    const { user } = item;
    const studentUser = getValue(user, {});

    return {
      value: getValue(item.id),
      label: getValue(studentUser.name),
    };
  });
};

export const transformToUpdate = data => {
  return filterUndefined({
    id: getValue(data.id),
    name: getValue(data.name, undefined),
    phone: getValue(data.phone, undefined),
    address: getValue(data.address, undefined),
    email: getValue(data.email, undefined),
    password: getValue(data.password, undefined),
    blood_group: getValue(data.blood_group, undefined),
    classes_id: getValue(data.classId, undefined),
    parent_id: getValue(data.parentId, undefined),
    school_id: getValue(data.school_id, undefined),
  });
};
