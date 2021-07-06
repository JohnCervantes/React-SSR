import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import Link from "next/link";
import { ALL_ANIMALS, readState } from "../operations/query";
import { setState } from "../operations/mutation";
import { ERROR_TOAST, SUCCESS_TOAST } from "../cache";
import { client } from "./_app";
import jwt from "jsonwebtoken";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { getPlaiceholder } from "plaiceholder";
import EmblaCarousel from "../components/Carousel/Carousel.js"

export const getServerSideProps = async () => {
  try {
    const { data } = await client.query(
      { query: ALL_ANIMALS },
      {
        fetchPolicy: "no-cache",
      }
    );
    const newData = [];
    await Promise.all(
      data.animals.map(async (animal) => {
        const { base64 } = await getPlaiceholder(animal.pic);
        newData.push({ ...animal, blurDataURL: base64 });
      })
    );
    return {
      props: {
        data: { animals: newData },
      },
    };
  } catch (error) {
    return { props: { errors: error.message } };
  }
};

function Zoo(props) {
  <Head>
    {/* <script src="https://unpkg.com/embla-carousel/embla-carousel.umd.js"></script> */}
  </Head>;
  const { data, errors } = props;
  const {
    data: {
      readState: { animals, user, showModal, icon },
    },
  } = useQuery(readState("animals, user, showModal, icon"));

  useEffect(() => {
    let token;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
    }
    const user = token ? jwt.verify(token, process.env.SECRET) : undefined;
    if (user) {
      setState({ user });
    }
  }, [user]);

  useEffect(() => {
    if (errors) {
      return setState({
        showToast: {
          ...ERROR_TOAST,
          header: "ERROR",
          message: errors,
        },
        showSpinner: false,
      });
    }
    if (data) {
      setState({
        animals: data.animals,
        initialLoad: true,
      });
    }
  }, [data, errors]);

  return (
    <div>
      <div className="navigation">
        <p className="title">LOST+FOUND</p>
        <div className="navigation-links">
          {user ? (
            <NavigationLink
              key={icon["addToggled"]}
              type="addAnimal"
              toggle="addToggled"
            >
              POST+
            </NavigationLink>
          ) : null}
          {!user ? (
            <NavigationLink
              key={icon["loggedToggled"]}
              type="login"
              toggle="loginToggled"
            >
              LOGIN
            </NavigationLink>
          ) : null}
          {!user ? (
            <NavigationLink
              key={icon["registerToggled"]}
              type="register"
              toggle="registerToggled"
            >
              REGISTER
            </NavigationLink>
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
              LOGOUT
            </button>
          ) : null}
        </div>
      </div>
      <div className="content-section">
        {!animals ? (
          <p>
            Content is only available to registered users. Please Login/Register
            to to see the content
          </p>
        ) : (
          <React.Fragment>
            <EmblaCarousel></EmblaCarousel>
            <p className="list-text">Pet listing:</p>
            <div className="animal-info-section">
              {animals.map((animal) => {
                return (
                  <Link key={animal._id} href={`/details/${animal._id}`}>
                    <div className="animal-info-container">
                      <Image
                        height="300px"
                        width="500px"
                        src={animal.pic}
                        blurDataURL={animal.blurDataURL}
                        alt="Picture of the missing pet"
                        placeholder="blur"
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

  function NavigationLink(props) {
    return (
      <button
        className={
          icon[props.toggle] ? "z-50 navigtaion-link" : "navigtaion-link"
        }
        onClick={() => {
          setState({
            showModal: { show: !showModal["show"], type: props.type },
            icon: { ...icon, [props.toggle]: !icon[props.toggle] },
          });
        }}
      >
        {props.children}{" "}
        <FontAwesomeIcon
          className="navigation-icon"
          icon={icon[props.toggle] ? faAngleUp : faAngleDown}
          size="lg"
        />
      </button>
    );
  }
}

export default Zoo;
