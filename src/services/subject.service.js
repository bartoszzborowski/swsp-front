import gql from 'graphql-tag';
import { getClient } from 'data/client/apolloClient';
import {
  transform,
  transformToSave,
} from 'stores/transformers/subjectTransformer';
import { handleResponse } from 'helpers';
import head from 'lodash/head';

const subjectService = {
  getAll,
  create,
  update,
  remove,
};

function getAll(customFilters = {}) {
  const QUERY = gql`
    query($take: Int!, $page: Int!, $filters: FiltersStudentSubjectInputType) {
      studentSubject(
        filters: $filters
        pagination: { take: $take, page: $page }
      ) {
        data {
          id
          name
        }
        per_page
        last_page
        current_page
        total
      }
    }
  `;

  return getClient()
    .query({
      query: QUERY,
      variables: { take: 100, page: 1, filters: customFilters },
    })
    .then(handleResponse)
    .then(result => {
      const {
        data: { studentSubject },
      } = result;
      const { data: SubjectData } = studentSubject;
      return transform(SubjectData);
    });
}

function create(student) {
  const MUTATION = gql`
    mutation($input: StudentSubjectInputType) {
      createSubject(input: $input) {
        id
        name
      }
    }
  `;
  const sanitizeData = transformToSave(student);

  return getClient()
    .mutate({
      mutation: MUTATION,
      variables: { input: { ...sanitizeData } },
    })
    .then(handleResponse)
    .then(result => {
      const {
        data: { createSubject },
      } = result;

      return head(transform([createSubject]));
    });
}

function update(student) {
  const MUTATION = gql`
    mutation($input: UpdateStudentSubjectInputType) {
      updateSubject(input: $input) {
        id
        name
      }
    }
  `;
  const sanitizeData = transformToSave(student);

  return getClient()
    .mutate({
      mutation: MUTATION,
      variables: { input: { ...sanitizeData } },
    })
    .then(handleResponse)
    .then(result => {
      const {
        data: { updateSubject },
      } = result;

      return head(transform([updateSubject]));
    });
}

function getByFilter() {
  const QUERY = gql`
    query($take: Int!, $page: Int!, $filters: FiltersStudentSubjectInputType) {
      studentSubject(
        filters: $filters
        pagination: { take: $take, page: $page }
      ) {
        data {
          id
          name
        }
        per_page
        last_page
        current_page
        total
      }
    }
  `;

  return getClient()
    .query({ query: QUERY, variables: { take: 100, page: 1 } })
    .then(handleResponse)
    .then(result => {
      const {
        data: { classes },
      } = result;
      const { data: ClassesData } = classes;
      return transform(ClassesData);
    });
}

function remove(id) {
  const MUTATION = gql`
    mutation($ids: [Int]) {
      deleteSubject(ids: $ids)
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
        data: { deleteSubject },
      } = result;

      return { id, deleteSubject };
    });
}

export default subjectService;
