import { gql } from "apollo-server-micro";
const typeDefs = gql`
  type animal {
    _id: ID
    pic: String!
    name: String!
    description: String!
    email: String!
    phone: String
  }

  type user {
    _id: ID
    password: String!
    email: String!
    firstName: String!
    lastName: String!
    phone: String
    isAdmin: Boolean
    registerDate: String!
    token: String
  }

  type Query {
    animals: [animal]
    users: [user]
    user(email: String!, password: String!): user
  }
  type Mutation {
    addAnimal(
      name: String!
      description: String!
      pic: String!
      phone: String
      email: String!
    ): animal
    addUser(
      password: String!
      email: String!
      firstName: String!
      lastName: String!
      phone: String
      isAdmin: Boolean
      registerDate: String!
    ): user
  }
`;

export default typeDefs;
