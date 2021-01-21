import gql from 'graphql-tag';
import { getClient } from 'data/client/apolloClient';
import { transform as parentsTransform } from 'stores/transformers/parentsTransformer';
import { handleResponse } from 'helpers';

const parentsService = {
  getAll,
};

function getAll(perPage = 100, page = 1) {
  const QUERY = gql`
    query($take: Int!, $page: Int!) {
      parents(pagination: { take: $take, page: $page }) {
        data {
          id
          user {
            name
            email
          }
        }
      }
    }
  `;

  return getClient()
    .query({ query: QUERY, variables: { take: perPage, page: page } })
    .then(handleResponse)
    .then(result => {
      const {
        data: { parents },
      } = result;
      const { data: ParentsData } = parents;
      return parentsTransform(ParentsData);
    });
}

export default parentsService;
