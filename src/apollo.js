import { ApolloClient } from 'apollo-client';
import { onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { ApolloLink, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const PORT = 9091;
const host = process.env.NODE_ENV === 'development' ? 'localhost' : process.env.HOST;
const graphqlEndpoint = '/graphql';
const subscriptionEndpoint = '/subscriptions';

// Create http link
const httpLink = createHttpLink({ uri: `http://${host}:${PORT}${graphqlEndpoint}` });

const middlewareLink = setContext(() => ({
  headers: {
    'x-token': localStorage.getItem('token'),
    'x-refresh-token': localStorage.getItem('refreshToken'),
  },
}));

const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const {
      response: { headers },
    } = operation.getContext();

    if (headers) {
      const token = headers.get('x-token');
      const refreshToken = headers.get('x-refresh-token');

      if (token) {
        localStorage.setItem('token', token);
      }

      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }
    }

    return response;
  });
});

const httpLinkWithMiddleware = afterwareLink.concat(middlewareLink.concat(httpLink));

// Create WebSocket link2
const wsLink = new WebSocketLink({
  uri: `ws://${host}:${PORT}${subscriptionEndpoint}`,
  options: {
    reconnect: true,
    connectionParams: () => {
      const token = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refreshToken');

      return {
        token,
        refreshToken,
      };
    },
    onError: (response, operation) => {
      console.log('subscription error:');
      console.log('response: ', response);
    },
  },
});

/**
 * Updates subscription with new login tokens.
 *
 * @param      {Object}  tokens  The tokens.
 */
export const updateSubScription = (tokens) => {
  if (wsLink.subscriptionClient.connectionParams.token === tokens.token) {
    return null;
  }

  wsLink.subscriptionClient.connectionParams.token = tokens.token;
  wsLink.subscriptionClient.connectionParams.refreshToken = tokens.refreshToken;

  wsLink.subscriptionClient.close();
  wsLink.subscriptionClient.connect();

  return wsLink;
};

const splitLink = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLinkWithMiddleware,
);

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');

  operation.setContext(() => ({
    headers: {
      'x-token': token,
      'x-refresh-token': refreshToken,
    },
  }));

  return forward(operation);
});

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
        );
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    }),
    authLink,
    splitLink,
  ]),
  cache: new InMemoryCache(),
});

export default client;
