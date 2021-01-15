import ReactDOM from 'react-dom';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import registerServiceWorker from './registerServiceWorker';
import Home from './pages/Home/Home';
import GlobalStyles from './globalStyles';
import client from './apollo';
import 'bootstrap/scss/bootstrap.scss';

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
