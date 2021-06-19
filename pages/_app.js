import "../styles/globals.css";
import { ApolloClient, ApolloProvider, HttpLink } from "@apollo/client";
import { cache } from "../cache.js";

const client = new ApolloClient({
  link: new HttpLink({
    //uri: "https://dry-stream-85503.herokuapp.com/graphql",
    uri: "http://localhost:3000/api/graphql",
  }),
  cache: cache,
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
