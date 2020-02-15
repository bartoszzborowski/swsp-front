import { TYPE_SUCCESS } from 'helpers';

const request = (type = '') => (data = '', scope = '') => {
  const upperScope = scope.toUpperCase();
  return { type: `REQUEST_${upperScope}_${type}`, data: { data, upperScope } };
};

const success = (type = '') => (data, scope) => {
  const upperScope = scope.toUpperCase();
  return {
    type: `REQUEST_SUCCESS_${upperScope}_${type}`,
    data: { data, upperScope },
  };
};

const failure = (type = '') => (error, scope) => {
  const upperScope = scope.toUpperCase();
  return {
    type: `REQUEST_FAILURE_${upperScope}_${type}`,
    data: { error, upperScope },
  };
};

const GET_ALL = 'GET_ALL';
const GET_ONE = 'GET_ONE';
const CREATE = 'CREATE';
const UPDATE = 'UPDATE';
const DELETE = 'DELETE';

export const getAllAction = {
  request: request(GET_ALL),
  success: success(GET_ALL),
  failure: failure(GET_ALL),
};

export const getOneAction = {
  request: request(GET_ONE),
  success: success(GET_ONE),
  failure: failure(GET_ONE),
};

export const updateAction = {
  request: request(UPDATE),
  success: success(UPDATE),
  failure: failure(UPDATE),
};

export const createAction = {
  request: request(CREATE),
  success: success(CREATE),
  failure: failure(CREATE),
};

export const deleteAction = {
  request: request(DELETE),
  success: success(DELETE),
  failure: failure(DELETE),
};

export const snakeAction = (message, type = TYPE_SUCCESS) => {
  return {
    message: message,
    options: {
      key: new Date().getTime() + Math.random(),
      variant: type,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    },
  };
};
