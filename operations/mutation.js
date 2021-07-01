import { gql } from "@apollo/client";
import { state, ERROR_TOAST, SUCCESS_TOAST } from "../cache";
import { client } from "../pages/_app";

const ADD_ANIMAL = gql`
  mutation addAnimal($name: String!, $color: String!, $age: Int!) {
    addAnimal(name: $name, color: $color, age: $age) {
      _id
      age
      color
      name
    }
  }
`;

export async function addAnimal(name, age, color) {
  try {
    const {
      data: { addAnimal },
    } = await client.mutate({
      mutation: ADD_ANIMAL,
      variables: { name, age, color },
    });
    setState({
      animals: state().animals.concat(addAnimal),
      showModal: { show: false, type: "" },
      showToast: {
        ...SUCCESS_TOAST,
        header: "SUCCESS",
        message: "New animal has been added!",
      },
    });
  } catch (e) {
    setState({
      showToast: {
        ...ERROR_TOAST,
        header: "ERROR",
        message: e.message,
      },
    });
  }
}

export function setState(field) {
  state({ ...state(), ...field });
}
