import gql from 'graphql-tag';
import { getClient } from 'data/client/apolloClient';
import head from 'lodash/head';
import { handleResponse } from 'helpers';
import { fragments } from './fragments';
import {
  transform,
  transformToSave,
} from '../stores/transformers/roomTransformer';

const classRoomsService = {
  getAll,
  update,
  create,
  remove,
};

function getAll() {
  const QUERY = gql`
    query($take: Int!, $page: Int!) {
      rooms(pagination: { take: $take, page: $page }) {
        data {
          ...RoomInfo
        }
        per_page
        last_page
        current_page
        total
      }
    }
    ${fragments.rooms}
  `;

  return getClient()
    .query({ query: QUERY, variables: { take: 500, page: 1 } })
    .then(handleResponse)
    .then(result => {
      const {
        data: { rooms },
      } = result;

      const { data: data } = rooms;
      return transform(data);
    });
}

function create(room) {
  const MUTATION = gql`
    mutation($input: RoomInputType) {
      createRoom(input: $input) {
        ...RoomInfo
      }
    }
    ${fragments.rooms}
  `;

  const serializedSData = transformToSave(room);

  return getClient()
    .mutate({
      mutation: MUTATION,
      variables: { input: serializedSData },
    })
    .then(handleResponse)
    .then(result => {
      const {
        data: { createRoom },
      } = result;

      return head(transform([createRoom]));
    });
}

function update(room) {
  const MUTATION = gql`
    mutation($input: UpdateRoomInputType) {
      updateRoom(input: $input) {
        ...RoomInfo
      }
    }
    ${fragments.rooms}
  `;

  const serializedSData = transformToSave(room);

  return getClient()
    .mutate({
      mutation: MUTATION,
      variables: { input: serializedSData },
    })
    .then(handleResponse)
    .then(result => {
      const {
        data: { updateRoom },
      } = result;

      return head(transform([updateRoom]));
    });
}

function remove(id) {
  const MUTATION = gql`
    mutation($ids: [Int]) {
      deleteRoom(ids: $ids)
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
        data: { deleteRoom },
      } = result;

      return { id, deleteRoom };
    });
}

export default classRoomsService;
