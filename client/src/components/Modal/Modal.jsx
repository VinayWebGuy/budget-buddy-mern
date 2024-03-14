import React from "react";
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
  onChange = () => {},
  onSubmit = () => {},
}) => {
  onChange();
  return (
    <div className="modal">
      <form className="modal-popup" onSubmit={onSubmit}>
        <h2 className="pageHeading">{heading}</h2>
        {selectOptions.map((select) => (
          <Select
            key={select.name}
            title={select.title}
            name={select.name}
            id={select.id}
            initialOption={select.initialOption}
            options={select.options}
            onChange={select.onChange}
            value={select.value}
            required={select.required}
          />
        ))}
        {inputs.map((input) => (
          <Input
            key={input.name}
            type={input.type}
            title={input.title}
            name={input.name}
            id={input.id}
            onChange={input.onChange} // Pass event and input name to onChange
            value={input.value}
            required={input.required}
          />
        ))}
        <button type="submit" className="btn">
          {buttonText}
        </button>
        <FaTimes className="close-modal" onClick={closeModal} />
      </form>
    </div>
  );
};
export default Modal;
