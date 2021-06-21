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

export function readState(fields){
  return gql`query {
    readState @client {
      ${fields}
    }
  }
`;
}
  