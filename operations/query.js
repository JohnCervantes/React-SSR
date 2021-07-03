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

export const USER = gql`
  query user($email: String!, $password: String!) {
    user(email: $email, password: $password) {
      _id
      email
      firstName
      lastName
      phone
      isAdmin
      registerDate
      token
    }
  }
`;

export function readState(fields) {
  return gql`query {
    readState @client {
      ${fields}
    }
  }
`;
}
