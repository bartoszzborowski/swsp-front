import gql from 'graphql-tag';
import { getClient } from 'data/client/apolloClient';
import {
  transform,
  transformToSave,
} from 'stores/transformers/routineTransformer';
import { handleResponse } from 'helpers';
import { fragments } from './fragments';
import head from 'lodash/head';

const routinesService = {
  create,
  update,
  remove,
  getById,
  getAll,
  getAllByCustomFilter,
};

function getAll(customFilters = {}) {
  const QUERY = gql`
    query($take: Int!, $page: Int!, $filters: FiltersRoutineType) {
      routine(pagination: { take: $take, page: $page }, filters: $filters) {
        data {
          ...RoutineInfo
        }
      }
    }
    ${fragments.routines}
  `;

  return getClient()
    .query({
      query: QUERY,
      variables: { take: 100, page: 1, filters: customFilters },
    })
    .then(handleResponse)
    .then(result => {
      const {
        data: { routine },
      } = result;
      const { data: RoutinesData } = routine;
      return transform(RoutinesData);
    });
}

function getById() {}

function create(routine) {
  const MUTATION = gql`
    mutation($input: RoutineInputType) {
      createRoutine(input: $input) {
        ...RoutineInfo
      }
    }
    ${fragments.routines}
  `;

  const serializedAData = transformToSave(routine);

  return getClient()
    .mutate({
      mutation: MUTATION,
      variables: { input: serializedAData },
    })
    .then(handleResponse)
    .then(result => {
      const {
        data: { createRoutine },
      } = result;

      return head(transform([createRoutine]));
    });
}

function update(routine) {
  const MUTATION = gql`
    mutation($input: UpdateRoutineInputType) {
      updateRoutine(input: $input) {
        ...RoutineInfo
      }
    }
    ${fragments.routines}
  `;

  const serializedAData = transformToSave(routine);

  return getClient()
    .mutate({
      mutation: MUTATION,
      variables: { input: serializedAData },
    })
    .then(handleResponse)
    .then(result => {
      const {
        data: { updateRoutine },
      } = result;

      return head(transform([updateRoutine]));
    });
}

function remove(id) {
  const MUTATION = gql`
    mutation($ids: [Int]) {
      deleteRoutine(ids: $ids)
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
        data: { deleteRoutine },
      } = result;

      return { id, deleteRoutine };
    });
}

function getAllByCustomFilter(customFilters = {}, take = 100, page = 1) {
  const QUERY = gql`
    query($take: Int!, $page: Int!, $filters: FiltersAttendanceInputType) {
      attendance(pagination: { take: $take, page: $page }, filters: $filters) {
        data {
          id
          student_id
          subject_id
          status
          timestamp
        }
        per_page
        last_page
        current_page
        total
      }
    }
  `;

  return getClient()
    .query({ query: QUERY, variables: { take, page, filters: customFilters } })
    .then(handleResponse)
    .then(result => {
      const {
        data: { attendance },
      } = result;
      const { data: attendanceData = {} } = attendance;

      return null;
    });
}

export default routinesService;
