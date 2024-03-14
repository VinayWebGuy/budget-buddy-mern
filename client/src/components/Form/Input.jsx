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
  required = false,
}) => {
  return (
    <div className={className}>
      <label htmlFor={id}>{title}</label>
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={onChange} // Use the provided onChange handler
        value={value}
        required={required}
      />
      {type === "checkbox" ? <span></span> : ""}
    </div>
  );
};

export default Input;
