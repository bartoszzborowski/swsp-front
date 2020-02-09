import gql from 'graphql-tag';
import { getClient } from 'data/client/apolloClient';
import { transform as classesTransform } from 'stores/transformers/classesTransformer';
import head from 'lodash/head';
import { handleResponse } from 'helpers';

const classesService = {
  getAll,
};

function getAll() {
  const QUERY = gql`
    query($take: Int!, $page: Int!) {
      classes(pagination: { take: $take, page: $page }) {
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
      return classesTransform(ClassesData);
    });
}

export default classesService;
