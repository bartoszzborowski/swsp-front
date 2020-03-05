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

export const fragments = {
  user: gql`
    fragment UserInfo on StudentType {
      user {
        id
        email
        name
        last_name
        address
        phone
        birthday
        blood_group
        gender
        token
      }
    }
  `,
  classes: gql`
    fragment ClassesInfo on StudentType {
      classes {
        id
        name
      }
    }
  `,
  session: gql`
    fragment SessionInfo on StudentType {
      session {
        id
        name
        status
        school_id
      }
    }
  `,
  parent: gql`
    fragment ParentInfo on StudentType {
      parent {
        id
        ...ParentInfoUser
      }
    }
  `,
  subject: gql`
    fragment SubjectInfo on StudentType {
      subject {
        id
        name
      }
    }
  `,
  section: gql`
    fragment SectionInfo on StudentType {
      section {
        id
        name
      }
    }
  `,
  userParent: gql`
    fragment ParentInfoUser on ParentType {
      user {
        id
        email
        name
        last_name
        address
        phone
        birthday
        blood_group
        gender
        token
      }
    }
  `,
};
