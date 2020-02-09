import resources from 'stores/resources';

const rootCustomResource = resources.map(item => {
  return {
    [item.name]: function resource(
      state = {
        loading: false,
        error: null,
        items: null,
        item: null,
      },
      action
    ) {
      const { name: Scope } = item;
      switch (action.type) {
        case `REQUEST_SUCCESS_${Scope.toUpperCase()}_UPDATE`:
          return {
            ...state,
            loading: false,
            items: state.items.map(item => {
              if (item.id === action.data.data.id) {
                console.log('codition true');
                return action.data.data;
              }

              return item;
            }),
          };
        case `REQUEST_SUCCESS_${Scope.toUpperCase()}_GET_ONE`:
          return {
            ...state,
            item: action.data.data,
            loading: false,
          };
        case `REQUEST_SUCCESS_${Scope.toUpperCase()}_GET_ALL`:
          return {
            ...state,
            items: action.data.data,
            loading: false,
          };
        case `REQUEST_${Scope.toUpperCase()}_UPDATE`:
        case `REQUEST_${Scope.toUpperCase()}_GET_ONE`:
        case `REQUEST_${Scope.toUpperCase()}_GET_ALL`:
          return {
            ...state,
            loading: true,
          };
        case `REQUEST_FAILURE_${Scope.toUpperCase()}_UPDATE`:
        case `REQUEST_FAILURE_${Scope.toUpperCase()}_GET_ONE`:
        case `REQUEST_FAILURE_${Scope.toUpperCase()}_GET_ALL`:
          console.log('action', action);
          return {
            ...state,
            error: action.data.error,
            loading: false,
          };
        default:
          return state;
      }
    },
  };
});

export { rootCustomResource as resources };
