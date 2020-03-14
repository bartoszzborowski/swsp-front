import {
  getValue,
  filterUndefined,
  wrapPaginate,
  getCurrentSchool,
} from 'helpers';

export const transform = (data, pagination) => {
  return data.map(item => {
    const sanitizeRoutine = getValue(item, {});
    const sanitizedSubject = getValue(sanitizeRoutine.subject, {});

    const serializedData = {
      id: getValue(sanitizeRoutine.id),
      classId: getValue(sanitizeRoutine.class_id),
      sectionId: getValue(sanitizeRoutine.section_id),
      subjectId: getValue(sanitizeRoutine.subject_id),
      subjectName: getValue(sanitizedSubject.name),
      teacherId: getValue(sanitizeRoutine.teacher_id),
      roomId: getValue(sanitizeRoutine.room_id),
      startingHour: getValue(sanitizeRoutine.starting_hour),
      endingHour: getValue(sanitizeRoutine.ending_hour),
      startingMinute: getValue(sanitizeRoutine.starting_minute),
      endingMinute: getValue(sanitizeRoutine.ending_minute),
      lessonNumber: getValue(sanitizeRoutine.lesson_number),
      day: getValue(sanitizeRoutine.day),
      schoolId: getValue(sanitizeRoutine.school_id),
    };

    if (pagination) {
      return wrapPaginate(serializedData, pagination);
    }

    return serializedData;
  });
};

export const transformToSave = (data = {}) => {
  return filterUndefined({
    id: getValue(data.id),
    class_id: getValue(data.classId, undefined),
    section_id: getValue(data.sectionId, undefined),
    subject_id: getValue(data.subjectId, undefined),
    teacher_id: getValue(data.teacherId, undefined),
    room_id: getValue(data.roomId, undefined),
    starting_hour: getValue(data.startingHour, undefined),
    ending_hour: getValue(data.endingHour, undefined),
    starting_minute: getValue(data.startingMinute, undefined),
    ending_minute: getValue(data.endingMinute, undefined),
    lesson_number: getValue(data.lessonNumber, undefined),
    day: getValue(data.day),
    school_id: getCurrentSchool(),
  });
};
