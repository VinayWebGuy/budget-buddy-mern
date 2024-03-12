import React, { useState } from "react";
import "./Modal.scss";
import Input from "./../Form/Input";
import { FaTimes } from "react-icons/fa";
import Select from "../Form/Select";

const Modal = ({
  heading,
  inputs = [],
  selectOptions = [],
  buttonText,
  closeModal,
}) => {
  console.log(selectOptions);
  return (
    <>
      <div className="modal">
        <div className="modal-popup">
          <h2 className="pageHeading">{heading}</h2>
          {selectOptions.map((select) => (
            <Select
              key={select.name}
              title={select.title}
              name={select.name}
              id={select.id}
              initialOption={select.initialOption}
              options={select.options}
            />
          ))}
          {inputs.map((input) => (
            <Input
              key={input.name}
              type={input.type}
              title={input.title}
              name={input.name}
              id={input.id}
            />
          ))}
          <button className="btn" onClick={closeModal}>
            {buttonText}
          </button>
          <FaTimes className="close-modal" onClick={closeModal} />
        </div>
      </div>
    </>
  );
};

export default Modal;
