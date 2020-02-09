import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { resources } from './resource.reducer';
// import { alert } from './alert.reducer';
console.log('resources', resources);

const flattenResource = [];
Object.keys(resources).forEach(function(item) {
  Object.keys(resources[item]).forEach(function(dupa) {
    flattenResource[dupa] = resources[item][dupa];
  });
});

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  ...flattenResource,
});

export default rootReducer;
