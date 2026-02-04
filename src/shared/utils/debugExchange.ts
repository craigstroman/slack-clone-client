import { Exchange } from 'urql';
import { pipe, tap } from 'wonka';

export const debugExchange: Exchange =
  ({ forward }: any) =>
  (ops$: any) =>
    pipe(
      forward(ops$),
      tap((e) => console.log('[urql]', e)),
    );
