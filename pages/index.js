// import Head from "next/head";
import Image from "next/image";
import React, { useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import Link from "next/link";
import { ALL_ANIMALS, readState } from "../operations/query";
import { setState } from "../operations/mutation";
import { ERROR_TOAST, SUCCESS_TOAST } from "../cache";
import { client } from "./_app";
import jwt from "jsonwebtoken";

function Zoo() {
  const { loading, error, data } = useQuery(ALL_ANIMALS, {
    fetchPolicy: "no-cache",
  });
  const {
    data: {
      readState: { animals, user },
    },
  } = useQuery(readState("animals, user"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = token ? jwt.verify(token, process.env.SECRET) : undefined;
    if (user) {
      setState({ user });
    }
  }, [user]);

  useEffect(() => {
    if (loading) {
      setState({ showSpinner: true });
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
        animals: data.animals,
        initialLoad: true,
        showSpinner: false,
      });
    }
  }, [data, loading, error]);

  return (
    <div>
      <div className="navigation">
        <label>Lost+Found</label>
        {user ? (
          <button
            onClick={() =>
              setState({ showModal: { show: true, type: "addAnimal" } })
            }
          >
            Add post
          </button>
        ) : null}
        {!user ? (
          <button
            onClick={() =>
              setState({ showModal: { show: true, type: "login" } })
            }
          >
            login
          </button>
        ) : null}
        {!user ? (
          <button
            onClick={() =>
              setState({ showModal: { show: true, type: "register" } })
            }
          >
            Register
          </button>
        ) : null}
        {user ? (
          <button
            onClick={() => {
              window.localStorage.removeItem("token");
              setState({
                user: null,
                showToast: {
                  ...SUCCESS_TOAST,
                  header: "Logout Sucessful",
                  message: "bye!",
                },
              });
              client.resetStore();
            }}
          >
            Logout
          </button>
        ) : null}
      </div>
      <div className="content-section">
        {!animals ? (
          <p>
            Content is only available to registered users. Please Login/Register
            to to see the content
          </p>
        ) : (
          <React.Fragment>
            <p className="menu">Pet listing:</p>
            <div className="animal-info-section">
              {animals.map((animal) => {
                return (
                  <Link key={animal._id} href={`/details/${animal._id}`}>
                    <div className="animal-info-container">
                      <Image
                        height="300px"
                        width="500px"
                        src={animal.pic}
                        alt="Picture of the missing pet"
                      />
                      <div className="animal-info">
                        <label>Name:</label> {animal.name}
                        <label>Description:</label> {animal.description}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default Zoo;
