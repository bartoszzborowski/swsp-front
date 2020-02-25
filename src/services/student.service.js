import gql from 'graphql-tag';
import { getClient } from 'data/client/apolloClient';
import {
  transform as StudentTransform,
  transformToUpdate,
} from 'stores/transformers/studentTransformer';
import head from 'lodash/head';
import { handleResponse } from 'helpers';

const studentService = {
  getAll,
  getById,
  update,
  remove,
  getByCustomFilters,
};

const fragments = {
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
  userParent: gql`
    fragment ParentInfo
    User on ParentType {
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

function getAll(perPage = 100, page = 1) {
  const QUERY = gql`
    query($take: Int!, $page: Int!) {
      students(pagination: { take: $take, page: $page }) {
        data {
          id
          ...UserInfo
          ...ParentInfo
          ...ClassesInfo
          ...SessionInfo
          ...SubjectInfo
        }
        per_page
        last_page
        current_page
        total
      }
    }
    ${fragments.user}
    ${fragments.parent}
    ${fragments.classes}
    ${fragments.session}
    ${fragments.userParent}
    ${fragments.subject}
  `;

  return getClient()
    .query({ query: QUERY, variables: { take: perPage, page: page } })
    .then(handleResponse)
    .then(result => {
      const {
        data: { students },
      } = result;
      const { data: studentData = {} } = students;
      return StudentTransform(studentData, students);
    });
}

function getById(id) {
  const QUERY = gql`
    query($take: Int!, $page: Int!, $id: Int) {
      students(pagination: { take: $take, page: $page }, filters: { id: $id }) {
        data {
          id
          ...UserInfo
          ...ParentInfo
          ...ClassesInfo
          ...SessionInfo
          ...SubjectInfo
        }
        per_page
        last_page
        current_page
        total
      }
    }
    ${fragments.user}
    ${fragments.parent}
    ${fragments.classes}
    ${fragments.session}
    ${fragments.userParent}
    ${fragments.subject}
  `;

  return getClient()
    .query({ query: QUERY, variables: { take: 10, page: 1, id } })
    .then(handleResponse)
    .then(result => {
      const {
        data: { students },
      } = result;
      const { data: studentData = {} } = students;
      console.log('studentsData', students);
      return head(StudentTransform(studentData, students).data);
    });
}

function getByCustomFilters(customFilters = {}, take = 100, page = 1) {
  const QUERY = gql`
    query($take: Int!, $page: Int!, $filters: FiltersStudentInputType) {
      students(pagination: { take: $take, page: $page }, filters: $filters) {
        data {
          id
          ...UserInfo
          ...ParentInfo
          ...ClassesInfo
          ...SessionInfo
          ...SubjectInfo
        }
        per_page
        last_page
        current_page
        total
      }
    }
    ${fragments.user}
    ${fragments.parent}
    ${fragments.classes}
    ${fragments.session}
    ${fragments.userParent}
    ${fragments.subject}
  `;

  return getClient()
    .query({ query: QUERY, variables: { take, page, filters: customFilters } })
    .then(handleResponse)
    .then(result => {
      const {
        data: { students },
      } = result;
      const { data: studentData = {} } = students;
      return StudentTransform(studentData, students);
    });
}

function update(student) {
  const MUTATION = gql`
    mutation($input: UpdateStudentInputType) {
      updateStudent(input: $input) {
        id
        ...UserInfo
        ...ParentInfo
        ...ClassesInfo
        ...SessionInfo
        ...SubjectInfo
      }
    }
    ${fragments.user}
    ${fragments.parent}
    ${fragments.classes}
    ${fragments.session}
    ${fragments.userParent}
    ${fragments.subject}
  `;
  const sanitizeStudent = transformToUpdate(student);

  return getClient()
    .mutate({
      mutation: MUTATION,
      variables: { input: { ...sanitizeStudent } },
    })
    .then(handleResponse)
    .then(result => {
      const {
        data: { updateStudent },
      } = result;

      return head(StudentTransform([updateStudent]));
    });
}

function remove(id) {
  const MUTATION = gql`
    mutation($ids: [Int]) {
      deleteStudents(ids: $ids)
    }
  `;

  return getClient()
    .mutate({
      mutation: MUTATION,
      variables: { ids: [id] },
    })
    .then(handleResponse)
    .then(result => {
      const {
        data: { deleteStudents },
      } = result;

      return { id, deleteStudents };
    });
}

export default studentService;
