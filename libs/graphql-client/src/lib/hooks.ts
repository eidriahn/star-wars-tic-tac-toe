import { $, useContext } from '@builder.io/qwik';
import { GraphQLContext } from './provider';
import type { DocumentNode } from 'graphql';
import type { AnyVariables } from '@urql/core';

export const useQuery = <TData = any, TVariables extends AnyVariables = AnyVariables>(
  query: DocumentNode,
) => {
  const context = useContext(GraphQLContext);

  return $(async (variables?: TVariables) => {
    const client = context.value.client;
    if (!client) {
      throw new Error('GraphQL client not found in context');
    }

    const result = await client.query(query, variables).toPromise();

    if (result.error) {
      throw result.error;
    }

    return result.data as TData;
  });
};

export const useMutation = <TData = any, TVariables extends AnyVariables = AnyVariables>(
  mutation: DocumentNode,
) => {
  const context = useContext(GraphQLContext);

  return $(async (variables: TVariables) => {
    const client = context.value.client;
    if (!client) {
      throw new Error('GraphQL client not found in context');
    }

    const result = await client.mutation(mutation, variables).toPromise();

    if (result.error) {
      throw result.error;
    }

    return result.data as TData;
  });
};