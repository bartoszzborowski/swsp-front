import gql from 'graphql-tag';
import { getClient } from 'data/client/apolloClient';
import {
  transform as sessionTransform,
  transformToCreate,
  transformToUpdate,
} from 'stores/transformers/sessionTransformer';
import { handleResponse } from 'helpers';
import head from 'lodash/head';

const sessionService = {
  getAll,
  create,
  remove,
  update,
};

function getAll() {
  const QUERY = gql`
    query($take: Int!, $page: Int!) {
      sessions(pagination: { take: $take, page: $page }) {
        data {
          id
          name
          status
        }
      }
    }
  `;

  return getClient()
    .query({ query: QUERY, variables: { take: 100, page: 1 } })
    .then(handleResponse)
    .then(result => {
      const {
        data: { sessions },
      } = result;
      const { data: SessionData } = sessions;
      return sessionTransform(SessionData);
    });
}

function create(session) {
  const MUTATION = gql`
    mutation($input: SessionInputType) {
      createSession(input: $input) {
        id
        name
        status
        school_id
      }
    }
  `;
  const sanitizeSession = transformToCreate(session);

  return getClient()
    .mutate({
      mutation: MUTATION,
      variables: { input: { ...sanitizeSession } },
    })
    .then(handleResponse)
    .then(result => {
      const {
        data: { createSession },
      } = result;

      return head(sessionTransform([createSession]));
    });
}

function update(session) {
  const MUTATION = gql`
    mutation($input: UpdateSessionInputType) {
      updateSession(input: $input) {
        id
        name
        status
        school_id
      }
    }
  `;
  const sanitizeSession = transformToUpdate(session);

  return getClient()
    .mutate({
      mutation: MUTATION,
      variables: { input: { ...sanitizeSession } },
    })
    .then(handleResponse)
    .then(result => {
      const {
        data: { updateSession },
      } = result;

      return head(sessionTransform([updateSession]));
    });
}

function remove(id) {
  const MUTATION = gql`
    mutation($ids: [Int]) {
      deleteSession(ids: $ids)
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
        data: { deleteSession },
      } = result;

      return { id, deleteSession };
    });
}

export default sessionService;
