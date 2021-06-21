import React, { useState, useEffect } from "react";
import { readState } from "../operations/query";
import { setState } from "../operations/mutation";
import { useQuery } from "@apollo/client";

function Modal() {
  const {
    data: {
      readState: { showModal },
    },
  } = useQuery(readState("showModal"));

  if (!showModal) {
    return null;
  }

  return (
    <div className="modal-container">
      <div className="modal-form">
        <p>test</p>
        <p>test2</p>
        <button
          onClick={() => {
            setState({ showModal: false });
          }}
        >
          x
        </button>
      </div>
    </div>
  );
}

export default Modal;
