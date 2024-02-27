import { HttpLink, ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({
  uri: process.env.GRAPHQL_URL,
  fetchOptions: { cache: "no-store" },
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${process.env.GRAPHQL_KEY}`,
    }
  }
});

const createApolloClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });
};

export default createApolloClient;
