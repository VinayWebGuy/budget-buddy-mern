import React from "react";
import "./Form.scss";

const Input = ({
  type,
  name = "",
  title = "",
  id = "",
  className = "formGroup",
  value = "",
  placeholder = "",
  onChange = () => {},
}) => {
  return (
    <div className={className}>
      <label htmlFor={id}>{title}</label>
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
      />
      {type === "checkbox" ? <span></span> : ""}
    </div>
  );
};

export default Input;
