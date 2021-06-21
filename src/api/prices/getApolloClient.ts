import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    NormalizedCacheObject,
} from "@apollo/client";

let apolloClient : ApolloClient<NormalizedCacheObject> | null = null;

export default function getApolloClient() : ApolloClient<NormalizedCacheObject> {
  if(apolloClient == null) {
    apolloClient = new ApolloClient({
      link: new HttpLink({
        uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2'
      }),
      cache: new InMemoryCache()
    });
  }

  return apolloClient;
}
  