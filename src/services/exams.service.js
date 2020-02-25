import gql from 'graphql-tag';
import { getClient } from 'data/client/apolloClient';
import {
  transform,
  transformToSave,
} from 'stores/transformers/attendanceTransformer';
import { handleResponse } from 'helpers';
import { transform as sessionTransform } from '../stores/transformers/sessionTransformer';

const examsService = {
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
      exams(pagination: { take: $take, page: $page }) {
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
        data: { exams },
      } = result;
      const { data: ExamsData } = exams;
      return sessionTransform(ExamsData);
    });
}

function getById() {}

function create(attendance) {
  const MUTATION = gql`
    mutation($input: ExamInputType) {
      createExam(input: $input) {
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
        data: { createExam },
      } = result;

      return null;
    });
}

function update(attendance) {
  const MUTATION = gql`
    mutation($input: UpdateExamInputType) {
      updateExam(input: $input) {
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

export default examsService;
