import {
  getAllAction,
  getOneAction,
  updateAction,
  deleteAction,
  createAction,
  snakeAction,
} from '../actionsCreator';
import { notifierActions } from './notifier.actions';
import { TYPE_ERROR } from 'helpers';
import { resourceName } from 'stores/resources';

const services = {
  [resourceName.student]: require('services/student.service'),
  [resourceName.classes]: require('services/classes.service'),
  [resourceName.parents]: require('services/parents.service'),
  [resourceName.session]: require('services/session.service'),
  [resourceName.subject]: require('services/subject.service'),
  [resourceName.attendance]: require('services/attendance.service'),
  [resourceName.sections]: require('services/sections.service'),
};

export const getList = scope => () => {
  return dispatch => {
    dispatch(getAllAction.request({}, scope));
    services[scope].default.getAll().then(
      data => {
        dispatch(getAllAction.success(data, scope));
      },
      error => {
        notifierActions.enqueueSnackbar(snakeAction(error.message, TYPE_ERROR));
        dispatch(getAllAction.failure(error, scope));
      }
    );
  };
};

export const getOne = scope => id => {
  return dispatch => {
    dispatch(getOneAction.request({}, scope));
    services[scope].default.getById(id).then(
      data => {
        dispatch(getOneAction.success(data, scope));
      },
      error => {
        notifierActions.enqueueSnackbar(snakeAction(error.message, TYPE_ERROR));
        dispatch(getOneAction.failure(error, scope));
      }
    );
  };
};

export const create = scope => data => {
  return dispatch => {
    dispatch(createAction.request(data, scope));
    return services[scope].default.create(data).then(
      data => {
        dispatch(
          notifierActions.enqueueSnackbar(
            snakeAction(`Success create ${scope}`)
          )
        );
        dispatch(createAction.success(data, scope));
        return Promise.resolve(data);
      },
      error => {
        dispatch(
          notifierActions.enqueueSnackbar(
            snakeAction(error.message, TYPE_ERROR)
          )
        );
        dispatch(createAction.failure(error, scope));
        return Promise.reject(error);
      }
    );
  };
};

export const update = scope => data => {
  return dispatch => {
    dispatch(updateAction.request(data, scope));
    return services[scope].default.update(data).then(
      data => {
        dispatch(
          notifierActions.enqueueSnackbar(
            snakeAction(`Success update ${scope}`)
          )
        );
        dispatch(updateAction.success(data, scope));
        return Promise.resolve(data);
      },
      error => {
        dispatch(
          notifierActions.enqueueSnackbar(
            snakeAction(error.message, TYPE_ERROR)
          )
        );
        dispatch(updateAction.failure(error, scope));
        return Promise.reject(error);
      }
    );
  };
};

export const remove = scope => id => {
  return dispatch => {
    dispatch(deleteAction.request(id, scope));
    return services[scope].default.remove(id).then(
      data => {
        dispatch(
          notifierActions.enqueueSnackbar(
            snakeAction(`Success delete ${scope} id ${id}`)
          )
        );
        dispatch(deleteAction.success(data, scope));
      },
      error => {
        notifierActions.enqueueSnackbar(snakeAction(error.message, TYPE_ERROR));
        dispatch(deleteAction.failure(error, scope));
      }
    );
  };
};
