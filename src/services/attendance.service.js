import gql from 'graphql-tag';
import { getClient } from 'data/client/apolloClient';
import {
  transform,
  transformToSave,
} from 'stores/transformers/attendanceTransformer';
import { handleResponse } from 'helpers';

const attendanceService = {
  create,
  update,
  getAllByCustomFilter,
};

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

      return transform(attendanceData, attendance);
    });
}

function create(attendance) {
  const MUTATION = gql`
    mutation($input: [AttendanceInputType]) {
      createAttendance(input: $input) {
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
        data: { createAttendance },
      } = result;

      return transform([createAttendance]);
    });
}

function update(attendance) {
  const MUTATION = gql`
    mutation($input: [UpdateAttendanceInputType]) {
      updateAttendance(input: $input) {
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
        data: { updateAttendance },
      } = result;

      return transform([updateAttendance]);
    });
}

export default attendanceService;
