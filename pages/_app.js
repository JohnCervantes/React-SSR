import "../styles/globals.css";
import { ApolloClient, ApolloProvider, HttpLink } from "@apollo/client";
import { cache } from "../cache.js";
import Modal from "../components/Modal";
import Spinner from "../components/Spinner";
import Toast from "../components/Toast";

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
      <Modal />
      <Spinner />
      <Toast/>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
