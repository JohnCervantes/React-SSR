// pages/api/graphql.js
import { ApolloServer } from "apollo-server-micro";
import typeDefs from "../../typedefs/index";
import resolvers from "../../resolvers/index";
import connectMongo from "../../dbConfig/mongoose";
import jwt from "jsonwebtoken";

connectMongo();

export const config = {
  api: {
    bodyParser: false,
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
  context: ({ req }) => {
    const token = req.headers.authorization || "";

    const decodedToken = token
      ? jwt.verify(token.replace("Bearer ", ""), process.env.SECRET)
      : undefined;
    if (decodedToken && decodedToken.email) {
      return { user: decodedToken.email };
    } else {
      return;
    }
  },
});
export default apolloServer.createHandler({ path: "/api/graphql" });
