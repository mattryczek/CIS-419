import { ApolloClient, InMemoryCache, from, HttpLink, ApolloLink } from '@apollo/client';
import { onError } from "@apollo/client/link/error";
import fetch from 'node-fetch';

export default (req) => {
  const AuthLink = (operation, next) => {
    return next(operation);
  };

  const client = new ApolloClient({
    ssrMode: true,
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.map(({ message, locations, path,
            extensions }) => {
            console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
          });

          if (networkError) {
            console.log(`[Network error]: ${networkError}`);
          }
        }
      }),
      AuthLink,
      new HttpLink({
        uri: 'http://localhost:8000/graphql',
        credentials: 'same-origin',
        fetch
      })
    ]),
    cache: new InMemoryCache(),
  });

  return client;
};