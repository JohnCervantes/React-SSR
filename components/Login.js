import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { USER } from "../operations/query";
import { RESET_MODAL, ERROR_TOAST, SUCCESS_TOAST } from "../cache";
import { setState } from "../operations/mutation";
import { client } from "../pages/_app";

export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userQuery, { called, loading, data, error }] = useLazyQuery(USER, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      setState({
        showToast: {
          ...SUCCESS_TOAST,
          header: "Login Sucessful",
          message: "welcome!",
        },
        showModal: RESET_MODAL,
        user: data.user
      });
      window.localStorage.setItem("token", data.user.token);
      client.resetStore();
    },
  });

  function handleLogin(e) {
    e.preventDefault();
    userQuery({ variables: { email, password } });
  }

  useEffect(() => {
    if (called && loading) {
      return setState({ showSpinner: true });
    } else {
      setState({ showSpinner: false });
    }
    if (error) {
      return setState({
        showToast: {
          ...ERROR_TOAST,
          header: "ERROR",
          message: error.message,
        },
      });
    }
  }, [data, error, loading, error]);

  return (
    <>
      <p className="form-header">Member Login</p>
      <div className="flex-col">
        <label>Email:</label>
        <input
          type="text"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div>{"\u00A0"}</div>
      </div>
      <div className="flex-col">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>{"\u00A0"}</div>
      </div>
      <label className="mb-3">
        <a href="#">Create Account</a>
      </label>
      <button className="form-submit" onClick={(e) => handleLogin(e)}>
        Submit
      </button>
    </>
  );
}
