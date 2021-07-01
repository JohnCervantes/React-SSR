import React, { useState, useEffect } from "react";
import { setState } from "../operations/mutation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { addAnimal } from "../operations/mutation";
import { RESET_MODAL } from "../cache";
import { useQuery } from "@apollo/client";
import { readState } from "../operations/query";
import Login from "./Login";

function Modal() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [color, setColor] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

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
        <div className="mb-3 flex-col">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3 flex-col">
          <label>Age:</label>
          <input
            type="text"
            value={age}
            name="age"
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="mb-6 flex-col">
          <label>Color:</label>
          <input
            type="text"
            value={color}
            name="color"
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <button
          className="form-submit"
          onClick={(e) => handleAddAnimal(name, Number(age), color, e)}
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
        <div className="mb-3 flex-col">
          <label>Email:</label>
          <input
            type="text"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3 flex-col">
          <label>Password:</label>
          <input
            type="text"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3 flex-col">
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            name="firstName"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-3 flex-col">
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            name="lastName"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-6 flex-col">
          <label>Phone Number:</label>
          <input
            type="text"
            value={phone}
            name="phoneNumber"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <button
          className="form-submit"
          onClick={(e) => handleAddAnimal(name, Number(age), color, e)}
        >
          Submit
        </button>
      </ModalTemplate>
    );
  }

  function handleAddAnimal(name, age, color, e) {
    e.preventDefault();
    addAnimal(name, Number(age), color);
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
