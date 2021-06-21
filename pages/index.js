import Head from "next/head";
import Image from "next/image";

import { useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import { ALL_ANIMALS, readState } from "../operations/query";
import { ADD_ANIMAL, setState } from "../operations/mutation";

function Zoo() {
  const { loading, error, data } = useQuery(ALL_ANIMALS);
  const {
    data: {
      readState: { animals, initialLoad },
    },
  } = useQuery(readState("animals, initialLoad"));
  const [addAnimalMut] = useMutation(ADD_ANIMAL);

  useEffect(() => {
    if (loading) {
      return setState({ showSpinner: true });
    }
    if (error) console.log(error);
    if (!initialLoad) {
      setState({ animals: data.animals, initialLoad: true, showSpinner: false});
    }
  }, [data]);

  async function handleAddAnimal() {
    try {
      const {
        data: { addAnimal },
      } = await addAnimalMut({
        variables: { name: "dog", age: 5, color: "green" },
      });
      setState({ animals: animals.concat(addAnimal) });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <div className="navigation">
        <p>Zoo</p>
        <button onClick={() => setState({ showModal: true })}>add+</button>
      </div>
      <div className="content-section">
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
      </div>
    </div>
  );
}

export default Zoo;
