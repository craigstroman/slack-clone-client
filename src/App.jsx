import ReactDOM from 'react-dom';
import React from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import registerServiceWorker from './registerServiceWorker';
import Home from './pages/Home/Home';
import GlobalStyles from './globalStyles';

const client = new ApolloClient({
  link: createHttpLink({ uri: 'http://localhost:9091/graphql' }),
  cache: new InMemoryCache(),
});

const App = (
  <>
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
    <GlobalStyles />
  </>
);

ReactDOM.render(App, document.getElementById('app'));
registerServiceWorker();
