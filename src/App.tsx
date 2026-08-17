import React from 'react';
import { createRoot } from 'react-dom/client';
import { Client, Provider, fetchExchange, ssrExchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import gql from 'graphql-tag';
import { Main } from './pages/Main/Main';
import { invalidateAllPosts } from './shared/utils/invalidateAllPosts';
import { betterUpdateQuery } from './shared/utils/betterUpdateQuery';
import {
  MeDocument,
  MeQuery,
  LogoutMutation,
  DeletePostMutationVariables,
  RegisterMutation,
  LoginMutation,
  VoteMutationVariables,
} from './generated/graphql';
import { debugExchange } from './shared/utils/debugExchange';
import { error } from './shared/utils/errorExchange';
import { cursorPagination } from './shared/utils/cursorPagination';
// dedupExchange

const element = document.getElementById('app');
const root = createRoot(element as HTMLDivElement);
const nodeEnv = process.env.NODE_ENV;
const ssr = ssrExchange({ isClient: false });

const client = new Client({
  url:
    nodeEnv === 'production'
      ? 'https://slack-clone.craigstroman.com/graphql'
      : 'http://localhost:9001/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  exchanges: [
    cacheExchange({
      resolvers: {},
      updates: {
        Mutation: {},
      },
    }),
    debugExchange,
    fetchExchange,
    ssr,
    error,
  ],
});

root.render(
  <React.StrictMode>
    <Provider value={client}>
      <Main />
    </Provider>
  </React.StrictMode>,
);
