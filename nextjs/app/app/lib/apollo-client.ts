import { HttpLink, ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({
  // uri: "http://172.23.0.3:8055/graphql",
  uri: "http://directus-cms:8055/graphql",
  
  fetchOptions: { cache: "no-store" },
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer cdMofZNuGUC8p0p0czlbVUJnZdCE40N6`,
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