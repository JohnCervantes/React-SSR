import { gql} from "@apollo/client";
import { animalsVar, initialDataLoad } from "../cache";

export const ADD_ANIMAL = gql`
  mutation addAnimal($name: String!, $color: String!, $age: Int!) {
    addAnimal(name:$name, color: $color, age: $age) {
      _id
      age
      color
      name
    }
  }
`;

export function addAnimal(animal){
    const updatedAnimals = [...animalsVar(), animal]
    animalsVar(updatedAnimals);
}

export function setAnimals(allAnimals){
    animalsVar(allAnimals)
}

export function setInitialDataLoad(value){
    initialDataLoad(value)
}
