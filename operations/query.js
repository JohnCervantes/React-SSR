import { gql } from "@apollo/client";

export const ALL_ANIMALS = gql`
  query {
    animals {
      _id
      age
      color
      name
    }
  }
`;

export const ALL_ANIMALS_VAR = gql`
  query {
    animalsVar @client {
      _id
      age
      color
      name
    }
  }
`;

export const INITIAL_DATA_LOAD_VAR = gql`
  query {
    initialDataLoadVar @client
  }
`;