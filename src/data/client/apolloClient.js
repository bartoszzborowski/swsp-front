import { ApolloLink } from 'apollo-boost';
import { ApolloClient } from 'apollo-boost';
import { setContext } from 'apollo-boost';
import fetch from 'isomorphic-fetch';
import { InMemoryCache } from 'apollo-cache-inmemory';
import CookiesJs from 'cookies-js';


const defaultOptions = {
    watchQuery: {
        fetchPolicy: 'network-only',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
    },
};

const config = {
    fetch,
    cache: new InMemoryCache({ addTypename: false }),
    link: ApolloLink.from([uploadLink]),
    defaultOptions,
};

export const client = new ApolloClient(config);
export const secretClient = new ApolloClient(config);

export default client;

export const getClient = token => {
    const authLink = setContext((_, { headers }) => {
        const authTokenFromCookie = process.browser ? CookiesJs.get('token') : '';
        const authToken = token || authTokenFromCookie || '';
        return {
            headers: {
                ...headers,
                authorization: authToken ? `Bearer ${authToken}` : '',
            },
        };
    });

    const config = {
        fetch,
        cache: new InMemoryCache({ addTypename: false }),
        link: ApolloLink.from([authLink, uploadLink]),
        defaultOptions,
    };

    return new ApolloClient(config);
};
