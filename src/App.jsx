import ReactDOM from 'react-dom';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import client from './apollo';
import Home from './pages/Home/Home';

const App = (
  <>
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  </>
);

ReactDOM.render(App, document.getElementById('app'));
