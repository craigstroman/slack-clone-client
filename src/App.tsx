import React from 'react';
import gql from 'graphql-tag';
import { createRoot } from 'react-dom/client';
import { Client, Provider, fetchExchange, ssrExchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import { Main } from './pages/Main/Main';
import { betterUpdateQuery } from './shared/utils/betterUpdateQuery';
import { MeDocument, MeQuery, LogoutMutation, RegisterMutation, LoginMutation } from './generated/graphql';
import { debugExchange } from './shared/utils/debugExchange';

const element = document.getElementById('app');
const root = createRoot(element as HTMLDivElement);
const nodeEnv = process.env.NODE_ENV;
const ssr = ssrExchange({ isClient: false });

const client = new Client({
  url:
    nodeEnv === 'production' ? 'https://lireddit.craigstroman.com/graphql' : 'http://localhost:9001/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  exchanges: [
    cacheExchange({
      keys: {},
      resolvers: {
        Query: {},
      },
      updates: {
        Mutation: {
          logout: (_result, args, cache, info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(cache, { query: MeDocument }, _result, () => ({
              me: null,
            }));
            cache.invalidate('Query', 'Me');
          },
          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result: any, query: any) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return {
                    me: result.login.user,
                  };
                }
              },
            );
            invalidateAllPosts(cache);
          },
          register: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result: any, query: any) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    me: result.register.user,
                  };
                }
              },
            );
          },
        },
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
