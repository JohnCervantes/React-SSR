import { gql } from "@apollo/client";
import { state, ERROR_TOAST, SUCCESS_TOAST } from "../cache";
import { client } from "../pages/_app";

const ADD_ANIMAL = gql`
  mutation addAnimal(
    $name: String!
    $description: String!
    $pic: String!
    $phone: String
    $email: String!
  ) {
    addAnimal(
      name: $name
      description: $description
      pic: $pic
      phone: $phone
      email: $email
    ) {
      _id
      name
      description
      pic
      phone
      email
    }
  }
`;

const ADD_USER = gql`
  mutation addUser(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $phone: String
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
        registerDate,
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

export async function addAnimal(name, description, pic, phone, email) {
  try {
    const {
      data: { addAnimal },
    } = await client.mutate({
      mutation: ADD_ANIMAL,
      variables: { name, description, pic, phone, email },
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
