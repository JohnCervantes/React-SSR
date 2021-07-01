import { gql } from "apollo-server-micro";
const typeDefs = gql`
  type animal {
    _id: ID
    name: String!
    color: String!
    age: Int!
  }

  type user {
    _id: ID
    passwordHash: String!
    email: String!
    firstName: String!
    lastName: String!
    phone: Int
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
    addAnimal(name: String, color: String, age: Int): animal
    createUser(
      passwordHash: String!
      email: String!
      firstName: String!
      lastName: String!
      phone: Int
      isAdmin: Boolean
      registerDate: String!
    ): user
  }
`;

export default typeDefs;
