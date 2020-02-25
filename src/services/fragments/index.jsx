import gql from 'graphql-tag';

export const classesFragment = {
  classes: gql`
    fragment ClassInfo on ClassType {
      id
      name
      class_id
      school_id
    }
  `,
};

export const sectionsFragment = {
  section: gql`
    fragment SectionInfo on SectionType {
      id
      name
    }
  `,
};
