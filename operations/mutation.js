import { gql } from "@apollo/client";
import { state } from "../cache";

export const ADD_ANIMAL = gql`
  mutation addAnimal($name: String!, $color: String!, $age: Int!) {
    addAnimal(name: $name, color: $color, age: $age) {
      _id
      age
      color
      name
    }
  }
`;

export function setState(field) {
  state({...state(), ...field});
}
