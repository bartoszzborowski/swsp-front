import gql from 'graphql-tag';
import { getClient } from 'data/client/apolloClient';
import { handleResponse } from 'helpers';
import { searchTransform } from 'stores/transformers/studentTransformer';

const searchService = {
  search,
};

function search(query, index) {
  const fragments = {
    student: gql`
      fragment StudentInfo on StudentType {
        id
        user {
          name
        }
      }
    `,
    parent: gql`
      fragment ParentInfo on ParentType {
        id
        user {
          name
        }
      }
    `,
  };
  let QUERY = '';

  if (index === 'parents') {
    QUERY = gql`
      query($page: Int!, $take: Int!, $filters: FiltersElasticSearchInputType) {
        search(filters: $filters, pagination: { page: $page, take: $take }) {
          ... on ParentType {
            ...ParentInfo
          }
        }
      }
      ${fragments.parent}
    `;
  }

  if (index === 'students') {
    QUERY = gql`
      query($page: Int!, $take: Int!, $filters: FiltersElasticSearchInputType) {
        search(filters: $filters, pagination: { page: $page, take: $take }) {
          ... on StudentType {
            ...StudentInfo
          }
        }
      }
      ${fragments.student}
    `;
  }

  const filters = { filters: { index, query } };
  return getClient()
    .query({ query: QUERY, variables: { take: 100, page: 1, ...filters } })
    .then(handleResponse)
    .then(result => {
      const {
        data: { search },
      } = result;

      return searchTransform(search);
    });
}

export default searchService;
