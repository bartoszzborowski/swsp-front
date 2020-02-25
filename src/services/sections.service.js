import gql from 'graphql-tag';
import { getClient } from 'data/client/apolloClient';
import { handleResponse } from 'helpers';
import {
  transform,
  transformToSave,
} from '../stores/transformers/sectionsTransformer';
import head from 'lodash/head';

const sectionsService = {
  create,
  update,
  remove,
  getById,
  getAll,
};

const fragments = {
  section: gql`
    fragment SectionInfo on SectionType {
      id
      name
      class_id
      school_id
    }
  `,
};

function getAll() {
  const QUERY = gql`
    query($take: Int!, $page: Int!) {
      classSections(pagination: { take: $take, page: $page }) {
        data {
          ...SectionInfo
        }
      }
    }
    ${fragments.section}
  `;

  return getClient()
    .query({ query: QUERY, variables: { take: 100, page: 1 } })
    .then(handleResponse)
    .then(result => {
      const {
        data: { classSections },
      } = result;
      const { data: SectionData } = classSections;
      return transform(SectionData);
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

export default sectionsService;
