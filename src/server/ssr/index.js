import React from 'react';
import { ApolloProvider } from '@apollo/client';
import App from './app';

const ServerClient = ({ client, location, context }) => {
  return(
    <ApolloProvider client={client}>
      <App location={location} context={context}/>
    </ApolloProvider>
  );
}

export default ServerClient;