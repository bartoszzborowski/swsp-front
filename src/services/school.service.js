import gql from 'graphql-tag';
import { getClient } from 'data/client/apolloClient';
import { handleResponse } from 'helpers';
import {
  transform,
  transformToSave,
} from '../stores/transformers/schoolTransformer';
import head from 'lodash/head';

const schoolService = {
  create,
  update,
  remove,
  getById,
  getAll,
};

const fragments = {
  schools: gql`
    fragment SchoolInfo on SchoolType {
      id
      name
    }
  `,
};

function getAll(customFilters = {}) {
  const QUERY = gql`
    query($take: Int!, $page: Int!, $filters: FiltersInputType) {
      schools(pagination: { take: $take, page: $page }, filters: $filters) {
        data {
          ...SchoolInfo
        }
      }
    }
    ${fragments.schools}
  `;

  return getClient()
    .query({
      query: QUERY,
      variables: { take: 100, page: 1, filters: customFilters },
    })
    .then(handleResponse)
    .then(result => {
      const {
        data: { schools },
      } = result;
      const { data: SchoolData } = schools;
      return transform(SchoolData);
    });
}

function getById() {}

function create(section) {
  const MUTATION = gql`
    mutation($input: ClassSectionInputType) {
      createClassSection(input: $input) {
        ...SectionInfo
      }
    }
    ${fragments.section}
  `;

  const serializedSection = transformToSave(section);

  return getClient()
    .mutate({
      mutation: MUTATION,
      variables: { input: serializedSection },
    })
    .then(handleResponse)
    .then(result => {
      const {
        data: { createClassSection },
      } = result;

      return head(transform([createClassSection]));
    });
}

function update(section) {
  const MUTATION = gql`
    mutation($input: UpdateClassSectionInputType) {
      updateClassSection(input: $input) {
        ...SectionInfo
      }
    }
    ${fragments.section}
  `;

  const serializedSection = transformToSave(section);

  return getClient()
    .mutate({
      mutation: MUTATION,
      variables: { input: serializedSection },
    })
    .then(handleResponse)
    .then(result => {
      const {
        data: { updateClassSection },
      } = result;

      return head(transform([updateClassSection]));
    });
}

function remove(id) {
  const MUTATION = gql`
    mutation($ids: [Int]) {
      deleteClassSection(ids: $ids)
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
        data: { deleteClassSection },
      } = result;

      return { id, deleteClassSection };
    });
}

export default schoolService;
