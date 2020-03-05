import {
  filterUndefined,
  getCurrentSchool,
  getValue,
  wrapPaginate,
} from 'helpers';

export const transform = (data, pagination) => {
  const serializedData = data.map(item => {
    const { user, parent, classes, session, subject, section } = item;
    const { user: userFromParent = {} } = getValue(parent, {});
    const { id: parentId } = getValue(parent, {});
    const parentUser = getValue(userFromParent, {});
    const studentUser = getValue(user, {});
    const studentClasses = getValue(classes, {});
    const studentSession = getValue(session, {});
    const studentSubject = getValue(subject, {});
    const studentSection = getValue(section, {});

    return {
      id: getValue(item.id),
      name: getValue(studentUser.name),
      lastName: getValue(studentUser.last_name),
      classId: getValue(studentClasses.id),
      className: getValue(studentClasses.name),
      parentId: getValue(parentId),
      parentName: getValue(parentUser.name),
      birthday: getValue(studentUser.birthday),
      gender: getValue(studentUser.gender),
      phone: getValue(studentUser.phone),
      sessionId: getValue(studentSession.id),
      sessionName: getValue(studentSession.name),
      subjectId: getValue(studentSubject.id),
      subjectName: getValue(studentSubject.name),
      sectionId: getValue(studentSection.id),
      sectionName: getValue(studentSection.name),
    };
  });

  if (pagination) {
    return wrapPaginate(serializedData, pagination);
  }

  return serializedData;
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
    id: getValue(data.id, undefined),
    name: getValue(data.name, undefined),
    last_name: getValue(data.lastName, undefined),
    phone: getValue(data.phone, undefined),
    address: getValue(data.address, undefined),
    email: getValue(data.email, undefined),
    password: getValue(data.password, undefined),
    gender: getValue(data.gender, undefined),
    birthday: getValue(data.birthday, undefined),
    blood_group: getValue(data.blood_group, undefined),
    classes_id: getValue(data.classId, undefined),
    parent_id: getValue(data.parentId, undefined),
    marital: getValue(data.marital, undefined),
    role: getValue(data.role, undefined),
    school_id: getCurrentSchool(),
    session_id: getValue(data.sessionId, undefined),
    subject_id: getValue(data.subjectId, undefined),
    section_id: getValue(data.sectionId, undefined),
  });
};
