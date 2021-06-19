import {  gql } from 'apollo-server-micro'
const typeDefs = gql`
    type animal {
        _id: ID
        name: String!
        color: String!
        age: Int!
    }
    type Query {
        animals: [animal]
    }
    type Mutation {
        addAnimal(name: String, color: String, age: Int): animal
    }
`;

export default typeDefs