import gql from 'graphql-tag';

export const sectionsFragment = {
  section: gql`
    fragment SectionInfo on SectionType {
      id
      name
      class_id
      school_id
    }
  `,
};

export const classesFragment = {
  classes: gql`
    fragment ClassesInfo on ClassType {
      id
      name
    }
  `,
};
