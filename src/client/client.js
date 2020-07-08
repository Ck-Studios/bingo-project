import {useMemo} from "react";
import {ApolloClient} from "apollo-client";
import {InMemoryCache} from "apollo-cache-inmemory";
import {HttpLink} from "apollo-link-http";
import fetch from "isomorphic-fetch";

let apolloClient;

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: "https://bingoring.me/api",
      credentials: "same-origin",
      fetch,
    }),
    cache: new InMemoryCache(),

  })
}

export function initializeApollo(initialState = null) {
  const _apolloclient = apolloClient ?? createApolloClient();

  if (initialState) {
    _apolloclient.cache.restore(initialState);
  }

  if (typeof window === "undefined") {
    return _apolloclient;
  }

  if (!_apolloclient) {
    apolloClient = _apolloclient;
  }

  return _apolloclient;
}

export function useApollo(initialState) {
  const store = useMemo(() =>
      initializeApollo(initialState)
    , [initialState]);

  return store;
}
