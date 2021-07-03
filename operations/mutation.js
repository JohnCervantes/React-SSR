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

const ADD_USER = gql`
  mutation addUser(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $phone: Int
    $isAdmin: Boolean
    $registerDate: String!
  ) {
    addUser(
      password: $password
      email: $email
      firstName: $firstName
      lastName: $lastName
      phone: $phone
      isAdmin: $isAdmin
      registerDate: $registerDate
    ) {
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

export async function addUser(
  email,
  password,
  firstName,
  lastName,
  phone,
  isAdmin,
  registerDate
) {
  try {
    const {
      data: { addUser },
    } = await client.mutate({
      mutation: ADD_USER,
      variables: {
        email,
        password,
        firstName,
        lastName,
        phone,
        isAdmin,
        registerDate
      },
    });
    setState({
      user: addUser,
      showModal: { show: false, type: "" },
      showToast: {
        ...SUCCESS_TOAST,
        header: "SUCCESS",
        message: "New user has been added!",
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
