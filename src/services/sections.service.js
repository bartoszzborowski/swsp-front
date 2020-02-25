import gql from 'graphql-tag';
import { getClient } from 'data/client/apolloClient';
import {
  transform,
  transformToSave,
} from 'stores/transformers/attendanceTransformer';
import { handleResponse } from 'helpers';
import { transform as sessionTransform } from '../stores/transformers/sessionTransformer';

const sectionsService = {
  create,
  update,
  remove,
  getById,
  getAll,
  getAllByCustomFilter,
};

const fragments = {
  section: gql`
    fragment SectionInfo on SectionType {
      id
      email
      name
      last_name
      address
      phone
      birthday
      blood_group
      gender
      token
    }
  `,
};

function remove() {}

function getAll() {
  const QUERY = gql`
    query($take: Int!, $page: Int!) {
      sections(pagination: { take: $take, page: $page }) {
        data {
          ...SectionInfo
        }
      }
    }
    ${fragments.section}
  `;

  return getClient()
    .query({ query: QUERY, variables: { take: 100, page: 1 } })
    .then(handleResponse)
    .then(result => {
      const {
        data: { sections },
      } = result;
      const { data: SectionData } = sections;
      return sessionTransform(SectionData);
    });
}

function getById() {}

function create(section) {
  const MUTATION = gql`
    mutation($input: ExamInputType) {
      createSection(input: $input) {
        ...SectionInfo
      }
    }
    ${fragments.section}
  `;

  const serializedAttendance = transformToSave(section);

  return getClient()
    .mutate({
      mutation: MUTATION,
      variables: { input: serializedAttendance },
    })
    .then(handleResponse)
    .then(result => {
      const {
        data: { createSection },
      } = result;

      return null;
    });
}

function update(section) {
  const MUTATION = gql`
    mutation($input: UpdateSectionInputType) {
      updateSection(input: $input) {
        ...SectionInfo
      }
    }
    ${fragments.section}
  `;

  const serializedAttendance = transformToSave(section);

  return getClient()
    .mutate({
      mutation: MUTATION,
      variables: { input: serializedAttendance },
    })
    .then(handleResponse)
    .then(result => {
      const {
        data: { updateSection },
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

export default sectionsService;
