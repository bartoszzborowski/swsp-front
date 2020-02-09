import { getAllAction, getOneAction, updateAction } from '../actionsCreator';

const services = {
  student: require('services/student.service'),
  classes: require('services/classes.service'),
};

// export const globalActions = {
//   getList,
//   getOne,
// };

export const getList = scope => () => {
  return dispatch => {
    dispatch(getAllAction.request({}, scope));
    services[scope].default.getAll().then(
      data => {
        dispatch(getAllAction.success(data, scope));
      },
      error => {
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
        dispatch(getOneAction.failure(error, scope));
      }
    );
  };
};

export const update = scope => data => {
  return dispatch => {
    dispatch(updateAction.request(data, scope));
    return services[scope].default.update(data).then(
      data => {
        dispatch(updateAction.success(data, scope));
      },
      error => {
        dispatch(updateAction.failure(error, scope));
      }
    );
  };
};
