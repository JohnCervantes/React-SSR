import Head from "next/head";
import Image from "next/image";

import { useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import {
  ALL_ANIMALS,
  ALL_ANIMALS_VAR,
  INITIAL_DATA_LOAD_VAR,
} from "../operations/query";
import {
  ADD_ANIMAL,
  addAnimal,
  setAnimals,
  setInitialDataLoad,
} from "../operations/mutation";

function Zoo() {
  const { loading, error, data } = useQuery(ALL_ANIMALS);
  const { data: animalsVarData } = useQuery(ALL_ANIMALS_VAR);
  const { data: initialDataLoadData } = useQuery(INITIAL_DATA_LOAD_VAR);
  const [addAnimalMut] = useMutation(ADD_ANIMAL);

  useEffect(() => {
    if (loading) {
      return <div>loading...</div>;
    }
    if (error) console.log(error);
    if (!initialDataLoadData.initialDataLoadVar) {
      setAnimals(data.animals);
      setInitialDataLoad(true);
    }
  }, [data]);

  async function handleAddAnimal() {
    try {
      const { data } = await addAnimalMut({
        variables: { name: "dog", age: 5, color: "green" },
      });
      addAnimal(data.addAnimal);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <div className="navigation">
        <p>Zoo</p>
        <button>add+</button>
      </div>
      <div className="content-section">
        <p className="label">Animals list:</p>

        <div className="animal-info-section">
          {animalsVarData.animalsVar.map((animal) => {
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
