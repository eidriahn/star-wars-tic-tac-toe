import { createClient, Client, fetchExchange, cacheExchange } from '@urql/core';

// Star Wars GraphQL API endpoint
const STAR_WARS_API_URL = 'https://swapi-graphql.netlify.app/.netlify/functions/index';

export class GraphQLClient {
  private static instance: Client | null = null;

  static getInstance(): Client {
    if (!this.instance) {
      this.instance = createClient({
        url: STAR_WARS_API_URL,
        exchanges: [cacheExchange, fetchExchange],
        requestPolicy: 'cache-first',
      });
    }
    return this.instance;
  }

  static destroy(): void {
    this.instance = null;
  }
}

export const getGraphQLClient = () => GraphQLClient.getInstance();