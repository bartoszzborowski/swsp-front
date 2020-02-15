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

const services = {
  student: require('services/student.service'),
  classes: require('services/classes.service'),
  parents: require('services/parents.service'),
  session: require('services/session.service'),
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
      },
      error => {
        dispatch(
          notifierActions.enqueueSnackbar(
            snakeAction(error.message, TYPE_ERROR)
          )
        );
        dispatch(createAction.failure(error, scope));
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
      },
      error => {
        dispatch(
          notifierActions.enqueueSnackbar(
            snakeAction(error.message, TYPE_ERROR)
          )
        );
        dispatch(updateAction.failure(error, scope));
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
