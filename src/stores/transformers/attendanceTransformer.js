import { filterUndefined, getValue, wrapPaginate } from 'helpers';

export const fields = {
  id: 'id',
  status: 'status',
  timestamp: 'timestamp',
  classId: 'classId',
  studentId: 'studentId',
  subjectId: 'subjectId',
  sessionId: 'sessionId',
  schoolId: 'schoolId',
  sectionId: 'sectionId',
};

export const transform = (data, pagination) => {
  const attendance = data.map(item => {
    const serializedAttendance = getValue(item, {});
    return {
      id: getValue(serializedAttendance.id),
      studentId: getValue(serializedAttendance.student_id),
      subjectId: getValue(serializedAttendance.subject_id),
      status: getValue(serializedAttendance.status),
      timestamp: new Date(getValue(serializedAttendance.timestamp)),
    };
  });

  if (pagination) {
    return wrapPaginate(attendance, pagination);
  }

  return attendance;
};

export const transformToSave = data => {
  return data.map(item => {
    return filterUndefined({
      id: getValue(item[fields.id]),
      status: getValue(item[fields.status], undefined),
      timestamp: getValue(item[fields.timestamp], undefined),
      class_id: getValue(item[fields.classId], undefined),
      student_id: getValue(item[fields.studentId], undefined),
      subject_id: getValue(item[fields.subjectId], undefined),
      session_id: getValue(item[fields.sessionId], undefined),
      school_id: getValue(item[fields.schoolId], undefined),
      section_id: getValue(item[fields.sectionId], undefined),
    });
  });
};
