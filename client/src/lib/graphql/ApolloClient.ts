import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client";
import { createFragmentRegistry } from "@apollo/client/cache";
import { setContext } from "@apollo/client/link/context";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import { RetryLink } from "@apollo/client/link/retry";

//Apollo client will send all requests to the GraphqlServer
const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_SERVER_API}/graphql`,
  credentials: "same-origin",  // include cookies with every request to  the api
});

async function getCookieData(): Promise<ReadonlyRequestCookies> {
  return cookies(); 
}

const authLink =  setContext(async (_, { headers}) => {
  const cookieStore = await getCookieData()

  const token =  cookieStore.get('jwt')?.value
  return {
      headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : ""
     }
  }
})

const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: Number.POSITIVE_INFINITY,
    jitter: true,
  },
  attempts: {
    max: 5,
    retryIf: (error, _operation) => !!error,
  },
});

const authHttpLink = authLink.concat(httpLink)
const link = retryLink.concat(authHttpLink);

// allows using this client directly in our components to fetch data
export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache({
      fragments: createFragmentRegistry(gql`
      fragment Status on Message {
         status
        }
      `)
    }),
    link: link
  });
});

