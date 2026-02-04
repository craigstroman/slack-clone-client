import { errorExchange } from '@urql/core';

export const error = errorExchange({
  onError: (error) => {
    console.error('GraphQL Error:', error);
  },
});
