// import Head from "next/head";
// import Image from "next/image";
import React, { useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import Link from "next/link";
import { ALL_ANIMALS, readState, VERIFY_TOKEN } from "../operations/query";
import { setState } from "../operations/mutation";
import { ERROR_TOAST } from "../cache";
import { client } from "./_app";

function Zoo() {
  const { loading, error, data } = useQuery(ALL_ANIMALS, {
    fetchPolicy: "no-cache",
  });
  const {
    data: {
      readState: { animals, initialLoad },
    },
  } = useQuery(readState("animals, initialLoad"));

  const [verifyTokenQuery, { data: dataa }] = useLazyQuery(VERIFY_TOKEN, {
    fetchPolicy: "network-only",
  });

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
        <p>Zoo</p>
        <button
          onClick={() =>
            setState({
              showToast: {
                show: true,
                status: "info",
                message: "test",
                header: "test header",
              },
            })
          }
        >
          shpw toast
        </button>
        <button
          onClick={() =>
            setState({ showModal: { show: true, type: "createAnimal" } })
          }
        >
          add+
        </button>
        <button
          onClick={() => setState({ showModal: { show: true, type: "login" } })}
        >
          login
        </button>
        <button
          onClick={() =>
            setState({ showModal: { show: true, type: "register" } })
          }
        >
          Register
        </button>
        <button onClick={() => {window.localStorage.removeItem("token"); client.resetStore()}}>Logout</button>
        <button
          onClick={() => {
            const token = window.localStorage.getItem("token");
            verifyTokenQuery({ variables: { token } });
          }}
        >
          verify token
        </button>
      </div>
      <div className="content-section">
        {!animals ? (
          <p>
            Content is only available to registered users. Please Login/Register
            to to see the content
          </p>
        ) : (
          <React.Fragment>
            <p className="label">Animals list:</p>
            <div className="animal-info-section">
              {animals.map((animal) => {
                return (
                  <Link key={animal._id} href={`/animal/${animal._id}`}>
                    <div className="animal-info-container">
                      <div className="animal-image">
                        <p>image</p>
                      </div>
                      <div className="animal-info">
                        <p>name: {animal.name}</p>
                        <p>age: {animal.age}</p>
                        <p>color: {animal.color}</p>
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
