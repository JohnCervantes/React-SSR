import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { readState } from "../../operations/query";
import { useRouter } from "next/router";
import { setState } from "../../operations/mutation";

function Id() {
  const router = useRouter();
  const [animal, setAnimal] = useState(null);
  const {
    data: {
      readState: { animals },
    },
  } = useQuery(readState("animals"));

  useEffect(() => {
    setState({ showSpinner: true });
    const { id } = router.query;
    const animal = animals.find((animal) => {
      return animal._id === id;
    });
    setAnimal(animal);
    setState({ showSpinner: false });
  }, []);

  if (animal) {
    return (
      <div>
        <p>{animal.name}</p>
        <p>{animal.color}</p>
        <p>{animal.age}</p>
      </div>
    );
  }
  return null;
}

export default Id;
