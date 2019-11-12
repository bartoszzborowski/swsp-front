// import config from 'config';
// import { authHeader } from 'helpers';
import gql from 'graphql-tag';
import {client, getClient} from 'data/client/apolloClient';

const config = {apiUrl: 'test'};
const authHeader = () => {
    return null
};

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete,
    getLoggedUser
};

function getLoggedUser(){
    return JSON.parse(localStorage.getItem('user')) || null;
}

function login(username, password) {
    const MUTATION = gql`
        mutation($email: String, $password: String) {
          userLogin(
            input: { email: $email, password: $password }
          ) {
            id
            email
            token
          }
        }
    `;
    return client
        .mutate({mutation: MUTATION, variables: {email: username, password: password}})
        .then(result => {
            const {data: {userLogin = {}}} = result;
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
          users{
            id
            email
            token
          }
        }
    `;

    return getClient().query({query: QUERY});
    // return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
