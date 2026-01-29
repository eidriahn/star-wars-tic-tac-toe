import {
  component$,
  createContextId,
  useContextProvider,
  useSignal,
  Slot,
  type Signal,
  noSerialize,
  type NoSerialize,
} from '@builder.io/qwik';
import { getGraphQLClient } from './client';
import type { Client } from '@urql/core';

export interface GraphQLContextState {
  client: NoSerialize<Client>;
}

export const GraphQLContext = createContextId<Signal<GraphQLContextState>>('graphql-client');

export const GraphQLProvider = component$(() => {
  const state = useSignal<GraphQLContextState>({
    client: noSerialize(getGraphQLClient()),
  });

  useContextProvider(GraphQLContext, state);

  return <Slot />;
});