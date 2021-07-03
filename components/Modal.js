import React, { useState, useEffect } from "react";
import { setState } from "../operations/mutation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { addAnimal, addUser } from "../operations/mutation";
import { RESET_MODAL } from "../cache";
import { useQuery } from "@apollo/client";
import { readState } from "../operations/query";
import Login from "./Login";
import { useFormik } from "formik";

function Modal() {
  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "This field is required";
    }
    if (!values.age) {
      errors.age = "This field is required";
    } else if (!Number(values.age)) {
      errors.age = "Age needs to be a number";
    }
    if (!values.color) {
      errors.color = "This field is required";
    }

    if (!values.password) {
      errors.password = "This field is required";
    }

    if (!values.firstName) {
      errors.firstName = "This field is required";
    }

    if (!values.lastName) {
      errors.lastName = "This field is required";
    }

    if (!/^$|^\d{10}$/.test(values.phone)) {
      errors.phone = "invalid phone number";
    }

    if (!values.email) {
      errors.email = "This field is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    return errors;
  };

  const addAnimalForm = useFormik({
    initialValues: {
      name: "",
      age: 0,
      color: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "This field is required";
      }
      if (!values.age) {
        errors.age = "This field is required";
      } else if (!Number(values.age)) {
        errors.age = "Age needs to be a number";
      }
      if (!values.color) {
        errors.color = "This field is required";
      }

      return errors;
    },

    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async ({ name, age, color }, { resetForm }) => {
      await addAnimal(name, Number(age), color);
      resetForm();
    },
  });

  const registerForm = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      password: "",
      email: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.password) {
        errors.password = "This field is required";
      }

      if (!values.firstName) {
        errors.firstName = "This field is required";
      }

      if (!values.lastName) {
        errors.lastName = "This field is required";
      }

      if (!/^$|^\d{10}$/.test(values.phone)) {
        errors.phone = "invalid phone number";
      }

      if (!values.email) {
        errors.email = "This field is required";
      } else if (
        !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      return errors;
    },

    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (
      { email, firstName, lastName, phone, password },
      { resetForm }
    ) => {
      console.log("test");
      await addUser(
        email,
        password,
        firstName,
        lastName,
        Number(phone),
        false,
        Date.now().toString()
      );
      resetForm();
    },
  });

  const {
    data: {
      readState: { showModal },
    },
  } = useQuery(readState("showModal"));

  if (!showModal.show) {
    return null;
  } else if (showModal.type === "createAnimal") {
    return (
      <ModalTemplate>
        <p className="form-header">Create an Animal</p>
        <div className="flex-col">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            onChange={addAnimalForm.handleChange}
            value={addAnimalForm.values.name}
          />
          {addAnimalForm.errors.name ? (
            <LoginError>{addAnimalForm.errors.name}</LoginError>
          ) : (
            <div>{"\u00A0"}</div>
          )}
        </div>
        <div className="flex-col">
          <label>Age:</label>
          <input
            type="text"
            name="age"
            value={addAnimalForm.values.age}
            onChange={addAnimalForm.handleChange}
          />
          {addAnimalForm.errors.age ? (
            <LoginError>{addAnimalForm.errors.age}</LoginError>
          ) : (
            <div>{"\u00A0"}</div>
          )}
        </div>
        <div className="mb-6 flex-col">
          <label>Color:</label>
          <input
            type="text"
            name="color"
            value={addAnimalForm.values.color}
            onChange={addAnimalForm.handleChange}
          />
          {addAnimalForm.errors.color ? (
            <LoginError>{addAnimalForm.errors.color}</LoginError>
          ) : (
            <div>{"\u00A0"}</div>
          )}
        </div>
        <button
          className="form-submit"
          type="submit"
          onClick={(e) => addAnimalForm.handleSubmit(e)}
        >
          Submit
        </button>
      </ModalTemplate>
    );
  } else if (showModal.type === "login") {
    return (
      <ModalTemplate>
        <Login />
      </ModalTemplate>
    );
  } else if (showModal.type === "register") {
    return (
      <ModalTemplate>
        <p className="form-header">Register</p>
        <div className="flex-col">
          <label>Email:</label>
          <input
            type="text"
            value={registerForm.values.email}
            name="email"
            onChange={registerForm.handleChange}
          />
          {registerForm.errors.email ? (
            <LoginError>{registerForm.errors.email}</LoginError>
          ) : (
            <div>{"\u00A0"}</div>
          )}
        </div>
        <div className="flex-col">
          <label>Password:</label>
          <input
            type="password"
            value={registerForm.values.password}
            name="password"
            onChange={registerForm.handleChange}
          />
          {registerForm.errors.password ? (
            <LoginError>{registerForm.errors.password}</LoginError>
          ) : (
            <div>{"\u00A0"}</div>
          )}
        </div>
        <div className="flex-col">
          <label>First Name:</label>
          <input
            type="text"
            value={registerForm.values.firstName}
            name="firstName"
            onChange={registerForm.handleChange}
          />
          {registerForm.errors.firstName ? (
            <LoginError>{registerForm.errors.firstName}</LoginError>
          ) : (
            <div>{"\u00A0"}</div>
          )}
        </div>
        <div className="flex-col">
          <label>Last Name:</label>
          <input
            type="text"
            value={registerForm.values.lastName}
            name="lastName"
            onChange={registerForm.handleChange}
          />
          {registerForm.errors.lastName ? (
            <LoginError>{registerForm.errors.lastName}</LoginError>
          ) : (
            <div>{"\u00A0"}</div>
          )}
        </div>
        <div className="flex-col">
          <label>Phone Number:</label>
          <input
            type="text"
            value={registerForm.values.phone}
            name="phone"
            onChange={registerForm.handleChange}
            placeholder="optional"
          />
          {registerForm.errors.phone ? (
            <LoginError>{registerForm.errors.phone}</LoginError>
          ) : (
            <div>{"\u00A0"}</div>
          )}
        </div>
        <button
          className="form-submit"
          type="submit"
          onClick={(e) => registerForm.handleSubmit(e)}
        >
          Submit
        </button>
      </ModalTemplate>
    );
  }

  function LoginError(props) {
    return (
      <p>
        <FontAwesomeIcon
          className="error"
          icon={faExclamationTriangle}
          size="sm"
        />
        {props.children}
      </p>
    );
  }
}

function ModalTemplate(props) {
  return (
    <div>
      <div
        className="modal-container"
        onClick={() => {
          setState({ showModal: RESET_MODAL });
        }}
      />
      <form className="modal-form">
        <FontAwesomeIcon
          className="cursor-pointer absolute top-3 right-3"
          size="lg"
          icon={faTimes}
          onClick={() => {
            setState({ showModal: RESET_MODAL });
          }}
        />
        {props.children}
      </form>
    </div>
  );
}

export default Modal;
