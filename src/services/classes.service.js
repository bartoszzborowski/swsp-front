import gql from 'graphql-tag';
import { getClient } from 'data/client/apolloClient';
import head from 'lodash/head';
import { handleResponse } from 'helpers';
import { classesFragment, sectionsFragment } from './fragments';
import {
  transform,
  transformToSave,
} from '../stores/transformers/classesTransformer';

const classesService = {
  getAll,
  update,
  create,
};

function getAll() {
  const QUERY = gql`
    query($take: Int!, $page: Int!) {
      classes(pagination: { take: $take, page: $page }) {
        data {
          ...ClassesInfo
          sections {
            ...SectionInfo
          }
        }
        per_page
        last_page
        current_page
        total
      }
    }
    ${classesFragment.classes}
    ${sectionsFragment.section}
  `;

  return getClient()
    .query({ query: QUERY, variables: { take: 500, page: 1 } })
    .then(handleResponse)
    .then(result => {
      const {
        data: { classes },
      } = result;
      console.log('result', result);
      const { data: ClassesData } = classes;
      return transform(ClassesData);
    });
}

function create(section) {
  const MUTATION = gql`
    mutation($input: ClassInputType) {
      createClass(input: $input) {
        ...ClassesInfo
        sections {
          ...SectionInfo
        }
      }
    }
    ${classesFragment.classes}
    ${sectionsFragment.section}
  `;

  const serializedSData = transformToSave(section);

  return getClient()
    .mutate({
      mutation: MUTATION,
      variables: { input: serializedSData },
    })
    .then(handleResponse)
    .then(result => {
      const {
        data: { createClass },
      } = result;

      return head(transform([createClass]));
    });
}

function update(section) {
  const MUTATION = gql`
    mutation($input: UpdateClassInputType) {
      updateClass(input: $input) {
        ...ClassesInfo
        sections {
          ...SectionInfo
        }
      }
    }
    ${classesFragment.classes}
    ${sectionsFragment.section}
  `;

  const serializedSData = transformToSave(section);

  return getClient()
    .mutate({
      mutation: MUTATION,
      variables: { input: serializedSData },
    })
    .then(handleResponse)
    .then(result => {
      const {
        data: { createClasses },
      } = result;

      return head(transform([createClasses]));
    });
}

export default classesService;
