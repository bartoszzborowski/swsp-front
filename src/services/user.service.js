import gql from 'graphql-tag';
import { client, getClient } from 'data/client/apolloClient';
import { handleResponse } from '../helpers';
import {
  transform as userTransform,
  transformToSave,
} from 'stores/transformers/userTransformer';
import head from 'lodash/head';

const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete,
};

function login(username, password) {
  const MUTATION = gql`
    mutation($email: String, $password: String) {
      userLogin(input: { email: $email, password: $password }) {
        id
        email
        token
      }
    }
  `;
  return client
    .mutate({
      mutation: MUTATION,
      variables: { email: username, password: password },
    })
    .then(result => {
      const {
        data: { userLogin = {} },
      } = result;
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(userLogin));
      return userLogin;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function getAll(perPage = 100, page = 1) {
  const QUERY = gql`
    query($take: Int!, $page: Int!) {
      users(pagination: { take: $take, page: $page }) {
        data {
          id
          email
          name
          address
          phone
          birthday
          blood_group
          gender
          last_name
          roles
        }
        per_page
        last_page
        current_page
        total
      }
    }
  `;

  return getClient()
    .query({ query: QUERY, variables: { take: perPage, page: page } })
    .then(handleResponse)
    .then(result => {
      const {
        data: { users },
      } = result;
      const { data: UserData } = users;
      return userTransform(UserData, users);
    });
}

function getById(id) {
  const QUERY = gql`
    query($take: Int!, $page: Int!, $id: Int) {
      users(pagination: { take: $take, page: $page }, filters: { id: $id }) {
        data {
          id
          email
          name
          address
          phone
          birthday
          blood_group
          gender
          last_name
          roles
        }
        total
        per_page
        current_page
        from
        to
        last_page
        has_more_pages
      }
    }
  `;

  return getClient()
    .query({ query: QUERY, variables: { take: 10, page: 1, id } })
    .then(handleResponse)
    .then(result => {
      const {
        data: { users },
      } = result;
      const { data: userData = {} } = users;

      return head(userTransform(userData, users).data);
    });
}

function register(user) {
  const MUTATION = gql`
    mutation($input: UserRegisterInputType) {
      register(input: $input) {
        id
        email
        name
        address
        phone
        birthday
        blood_group
        token
        roles
      }
    }
  `;
  const serializedUser = transformToSave(user);
  return client
    .mutate({
      mutation: MUTATION,
      variables: { input: { ...serializedUser } },
    })
    .then(result => {
      const {
        data: { register = {} },
      } = result;

      return register;
    });
}

function update(user) {
  const MUTATION = gql`
    mutation($input: UpdateUserInputType) {
      updateUser(input: $input) {
        id
        email
        name
        address
        phone
        birthday
        blood_group
        token
        roles
      }
    }
  `;
  const serializedUser = transformToSave(user);
  return client
    .mutate({
      mutation: MUTATION,
      variables: { input: { ...serializedUser } },
    })
    .then(result => {
      const {
        data: { updateUser = {} },
      } = result;

      return updateUser;
    });
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  // const requestOptions = {
  //   method: 'DELETE',
  //   headers: authHeader(),
  // };
  // return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(
  //   handleResponse
  // );
}

export default userService;
