export const ENQUEUE_SNACKBAR = 'ENQUEUE_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export const REMOVE_SNACKBAR = 'REMOVE_SNACKBAR';

export const notifierActions = {
  enqueueSnackbar,
  closeSnackbar,
};

export const removeSnackbar = key => ({
  type: REMOVE_SNACKBAR,
  key,
});

function enqueueSnackbar(notification) {
  return dispatch => {
    const key = notification.options && notification.options.key;

    dispatch({
      type: ENQUEUE_SNACKBAR,
      notification: {
        ...notification,
        key: key || new Date().getTime() + Math.random(),
      },
    });
  };
}

function closeSnackbar(key) {
  return dispatch => {
    dispatch({
      type: CLOSE_SNACKBAR,
      dismissAll: !key,
      key,
    });
  };
}
//
// function removeSnackbar(key) {
//   return dispatch => {
//     dispatch({
//       type: REMOVE_SNACKBAR,
//       key,
//     });
//   };
// }
// function closeSnackbar(key) {
//   dispatch => {
//     return dispatch({type: CLOSE_SNACKBAR, dismissAll: !key, key,})
//   }
// }

// export const closeSnackbar = key => ({
//   type: CLOSE_SNACKBAR,
//   dismissAll: !key, // dismiss all if no key has been defined
//   key,
// });

// export const removeSnackbar = key => ({
//   type: REMOVE_SNACKBAR,
//   key,
// });
