import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

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

const link = new HttpLink({
  // uri: 'http://127.0.0.1:8020/graphql',
  uri: 'http://192.168.0.213:8020/graphql',
});

const config = {
  cache: new InMemoryCache({ addTypename: false }),
  link,
  defaultOptions,
  connectToDevTools: true,
};

export const client = new ApolloClient(config);

export const getClient = token => {
  setContext((_, { headers }) => {
    const authTokenFromCookie = localStorage.get('user').token;
    const authToken = token || authTokenFromCookie || '';
    return {
      headers: {
        ...headers,
        authorization: authToken ? `Bearer ${authToken}` : '',
      },
    };
  });

  const config = {
    link,
    cache: new InMemoryCache({ addTypename: true }),
    defaultOptions,
    connectToDevTools: true,
  };

  return new ApolloClient(config);
};

export default client;
