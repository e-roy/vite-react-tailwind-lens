import { gql } from "@apollo/client/core";
import { ApolloClient, InMemoryCache } from "@apollo/client";

export const REFRESH_AUTHENTICATION = `
  mutation ($request: RefreshRequest!) {
    refresh(request: $request) {
      accessToken
      refreshToken
    }
  }
`;

export const refreshAuth = (refreshToken: string) => {
  return apolloClient.mutate({
    mutation: gql(REFRESH_AUTHENTICATION),
    variables: {
      request: {
        refreshToken,
      },
    },
  });
};

const APIURL = "https://api-mumbai.lens.dev/";

const apolloClient = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
});
