import gql from 'graphql-tag';
import { getClient } from 'data/client/apolloClient';
import {
  transform,
  transformToSave,
} from 'stores/transformers/attendanceTransformer';
import { handleResponse } from 'helpers';
import { transform as sessionTransform } from '../stores/transformers/sessionTransformer';

const routinesService = {
  create,
  update,
  remove,
  getById,
  getAll,
  getAllByCustomFilter,
};

function remove() {}

function getAll() {
  const QUERY = gql`
    query($take: Int!, $page: Int!) {
      routines(pagination: { take: $take, page: $page }) {
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
        data: { routines },
      } = result;
      const { data: RoutinesData } = routines;
      return null;
    });
}

function getById() {}

function create(attendance) {
  const MUTATION = gql`
    mutation($input: RoutinesInputType) {
      createRoutines(input: $input) {
        id
        student_id
        subject_id
        status
        timestamp
      }
    }
  `;

  const serializedAttendance = transformToSave(attendance);

  return getClient()
    .mutate({
      mutation: MUTATION,
      variables: { input: serializedAttendance },
    })
    .then(handleResponse)
    .then(result => {
      const {
        data: { createRoutines },
      } = result;

      return null;
    });
}

function update(attendance) {
  const MUTATION = gql`
    mutation($input: [UpdateRoutinesInputType]) {
      updateRoutines(input: $input) {
        id
        student_id
        subject_id
        status
        timestamp
      }
    }
  `;

  const serializedAttendance = transformToSave(attendance);

  return getClient()
    .mutate({
      mutation: MUTATION,
      variables: { input: serializedAttendance },
    })
    .then(handleResponse)
    .then(result => {
      const {
        data: { updateRoutines },
      } = result;

      return null;
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
