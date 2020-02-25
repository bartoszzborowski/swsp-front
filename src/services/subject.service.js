import gql from 'graphql-tag';
import { getClient } from 'data/client/apolloClient';
import { transform } from 'stores/transformers/subjectTransformer';
import { handleResponse } from 'helpers';

const subjectService = {
  getAll,
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
      }1
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

export default subjectService;
