import gql from 'graphql-tag';
import { getClient } from 'data/client/apolloClient';
import {
  transform as StudentTransform,
  transformToUpdate,
} from 'stores/transformers/studentTransformer';
import head from 'lodash/head';
import { handleResponse } from 'helpers';
import { fragments } from './fragments';

const studentService = {
  getAll,
  getById,
  update,
  remove,
  create,
  getByCustomFilters,
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
          ...SectionInfo
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
    ${fragments.section}
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
          ...SectionInfo
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
    ${fragments.section}
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
          ...SectionInfo
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
    ${fragments.section}
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

function create(student) {
  const MUTATION = gql`
    mutation($input: StudentInputType) {
      createStudent(input: $input) {
        id
        ...UserInfo
        ...ParentInfo
        ...ClassesInfo
        ...SessionInfo
        ...SubjectInfo
        ...SectionInfo
      }
    }
    ${fragments.user}
    ${fragments.parent}
    ${fragments.classes}
    ${fragments.session}
    ${fragments.userParent}
    ${fragments.subject}
    ${fragments.section}
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
        data: { createStudent },
      } = result;

      return head(StudentTransform([createStudent]));
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
        ...SectionInfo
      }
    }
    ${fragments.user}
    ${fragments.parent}
    ${fragments.classes}
    ${fragments.session}
    ${fragments.userParent}
    ${fragments.subject}
    ${fragments.section}
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
