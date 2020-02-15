import { userConstants } from 'stores/constants';

export function users(
  state = { loading: false, error: null, items: null, item: null },
  action
) {
  switch (action.type) {
    case userConstants.GET_ONE_REQUEST:
    case userConstants.GETALL_REQUEST:
    case userConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.GETALL_SUCCESS:
      return {
        ...state,
        items: action.users,
        loading: false,
      };
    case userConstants.UPDATE_SUCCESS:
    case userConstants.GET_ONE_SUCCESS:
      return {
        ...state,
        item: action.user,
        loading: false,
      };
    case userConstants.UPDATE_FAILURE:
    case userConstants.GET_ONE_FAILURE:
    case userConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.id ? { ...user, deleting: true } : user
        ),
        loading: true,
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        ...state,
        items: state.items.filter(user => user.id !== action.id),
        loading: false,
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        }),
        loading: false,
      };
    default:
      return state;
  }
}
