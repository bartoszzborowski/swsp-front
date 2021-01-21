import { filterUndefined, getCurrentSchool, getValue } from 'helpers';
import { transform as SectionTransform } from './sectionsTransformer';

export const transform = data => {
  return data.map(item => {
    const { sections = [] } = item;
    const sanitizeClasses = getValue(item, {});
    const sanitizeSections = getValue(sections, []);

    return {
      id: getValue(sanitizeClasses.id),
      name: getValue(sanitizeClasses.name),
      sections: SectionTransform(sanitizeSections),
    };
  });
};

export const transformToSave = (data = {}) => {
  return filterUndefined({
    id: getValue(data.id, undefined),
    name: getValue(data.classes, undefined),
    sections: getValue(mapSections(data.sections), []),
    school_id: getCurrentSchool(),
  });
};

const mapSections = (sections = []) => {
  return sections.map(item => {
    return item.value;
  });
};
