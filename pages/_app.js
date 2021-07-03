import "../styles/globals.css";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { cache } from "../cache.js";
import Modal from "../components/Modal";
import Spinner from "../components/Spinner";
import Toast from "../components/Toast";

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(
    createHttpLink({
      uri: process.env.URI || "http://localhost:3000/api/graphql"
    })
  ),
  cache: cache,
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Spinner />
      <Toast />
      <Modal />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
