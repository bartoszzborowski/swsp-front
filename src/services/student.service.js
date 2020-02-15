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
};

function getAll(perPage = 100, page = 1) {
  const QUERY = gql`
    query($take: Int!, $page: Int!) {
      students(pagination: { take: $take, page: $page }) {
        data {
          id
          user {
            name
            email
            birthday
            phone
            gender
          }
          classes {
            id
            name
          }
          parent {
            id
            user {
              name
            }
          }
        }
        per_page
        last_page
        current_page
        total
      }
    }
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
          user {
            name
            email
            birthday
            phone
            gender
          }
          classes {
            id
            name
          }
          parent {
            id
            user {
              name
            }
          }
        }
        per_page
        last_page
        current_page
        total
      }
    }
  `;

  return getClient()
    .query({ query: QUERY, variables: { take: 10, page: 1, id } })
    .then(handleResponse)
    .then(result => {
      const {
        data: { students },
      } = result;
      const { data: studentData = {} } = students;
      return head(StudentTransform(studentData, students).data);
    });
}

function update(student) {
  const MUTATION = gql`
    mutation($input: UpdateStudentInputType) {
      updateStudent(input: $input) {
        id
        user {
          name
          email
          birthday
          phone
          gender
        }
        classes {
          id
          name
        }
        parent {
          id
          user {
            name
          }
        }
      }
    }
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
