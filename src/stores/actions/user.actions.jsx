import { userConstants } from 'stores/constants';
import userService from 'services/user.service';
import { history, TYPE_ERROR } from 'helpers';
import { notifierActions } from './notifier.actions';
import { snakeAction } from '../actionsCreator';

export const userActions = {
  login,
  logout,
  register,
  update,
  getAll,
  getOne,
  delete: _delete,
};

function login(username, password) {
  return dispatch => {
    dispatch(request({ username }));
    userService.login(username, password).then(
      user => {
        dispatch(success(user));
        history.push('/');
      },
      error => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function register(user, redirect = false) {
  return dispatch => {
    dispatch(request(user));

    return userService.register(user).then(
      user => {
        dispatch(success());
        dispatch(
          notifierActions.enqueueSnackbar(
            snakeAction(`Success create new User`)
          )
        );

        return Promise.resolve(user);

        if (redirect) {
          history.push('/login');
        }
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(
          notifierActions.enqueueSnackbar(
            snakeAction(error.message, TYPE_ERROR)
          )
        );
        return Promise.reject(error);
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

function update(user) {
  return dispatch => {
    dispatch(request(user));

    return userService.update(user).then(
      user => {
        dispatch(success());
        dispatch(
          notifierActions.enqueueSnackbar(snakeAction(`Success updated User`))
        );

        return Promise.resolve(user);
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(
          notifierActions.enqueueSnackbar(
            snakeAction(error.message, TYPE_ERROR)
          )
        );
        return Promise.reject(error);
      }
    );
  };

  function request(user) {
    return { type: userConstants.UPDATE_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.UPDATE_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.UPDATE_FAILURE, error };
  }
}

function getAll() {
  return dispatch => {
    dispatch(request());

    userService.getAll().then(
      users => dispatch(success(users.data.users)),
      error => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: userConstants.GETALL_REQUEST };
  }
  function success(users) {
    return { type: userConstants.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
}

function getOne(id) {
  return dispatch => {
    dispatch(request());

    userService.getById(id).then(
      user => dispatch(success(user)),
      error => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: userConstants.GET_ONE_REQUEST };
  }
  function success(user) {
    return { type: userConstants.GET_ONE_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.GET_ONE_FAILURE, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return dispatch => {
    dispatch(request(id));

    userService.delete(id).then(
      user => dispatch(success(id)),
      error => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: userConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: userConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: userConstants.DELETE_FAILURE, id, error };
  }
}
