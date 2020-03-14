import gql from 'graphql-tag';
import { getClient } from 'data/client/apolloClient';
import { transform } from 'stores/transformers/teacherTransformer';
import { handleResponse } from 'helpers';
import { fragments } from './fragments';

const teacherService = {
  getAll,
};

function getAll(perPage = 100, page = 1) {
  const QUERY = gql`
    query($take: Int!, $page: Int!) {
      teachers(pagination: { take: $take, page: $page }) {
        data {
          id
          ...UserInfo
        }
      }
    }
    ${fragments.userTeacher}
  `;

  return getClient()
    .query({ query: QUERY, variables: { take: perPage, page: page } })
    .then(handleResponse)
    .then(result => {
      const {
        data: { teachers },
      } = result;
      const { data: TeachersData } = teachers;
      return transform(TeachersData);
    });
}

export default teacherService;
