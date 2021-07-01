import React, { useState, useEffect } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { readState, USER, VERIFY_TOKEN } from "../operations/query";
import { RESET_MODAL, ERROR_TOAST, SUCCESS_TOAST } from "../cache";
import { setState } from "../operations/mutation";
import { client } from "../pages/_app";

export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userQuery, { called, loading, data, error }] = useLazyQuery(USER, {
    fetchPolicy: "network-only",
    onCompleted: () => {
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
    if (data) {
      setState({
        user: { ...data.user },
        showModal: RESET_MODAL,
        showToast: {
          SUCCESS_TOAST,
          header: "Success",
          message: "logging in successful",
        },
      });
      window.localStorage.setItem("token", data.user.token);
      client.resetStore();
    }
  }, [data, error, loading, error]);

  return (
    <>
      <p className="form-header">Member Login</p>
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
      <label className="mb-3">
        <a href="#">Create Account</a>
      </label>
      <button className="form-submit" onClick={(e) => handleLogin(e)}>
        Submit
      </button>
    </>
  );
}
