import React from "react";
import "./Form.scss";

const Textarea = ({
  name = "",
  title = "",
  id = "",
  className = "formGroup",
  value = "",
  placeholder = "",
}) => {
  return (
    <div className={className}>
      <label htmlFor={id}>{title}</label>
      <textarea name={name} id={id} placeholder={placeholder}></textarea>
    </div>
  );
};

export default Textarea;
