import gql from 'graphql-tag';
import { client, getClient } from 'data/client/apolloClient';

export const userService = {
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

function getAll() {
  const QUERY = gql`
    query {
      users {
        id
        email
        token
      }
    }
  `;

  return getClient().query({ query: QUERY });
  // return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getById(id) {
  // const requestOptions = {
  //   method: 'GET',
  //   headers: authHeader(),
  // };
  // return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(
  //   handleResponse
  // );
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
      }
    }
  `;
  return client
    .mutate({
      mutation: MUTATION,
      variables: { user },
    })
    .then(result => {
      const {
        data: { register = {} },
      } = result;

      return register;
    });
}

function update(user) {
  // const requestOptions = {
  //   method: 'PUT',
  //   headers: { ...authHeader(), 'Content-Type': 'application/json' },
  //   body: JSON.stringify(user),
  // };
  // return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(
  //   handleResponse
  // );
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
