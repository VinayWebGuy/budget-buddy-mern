import React from "react";
import "./Form.scss";

const Select = ({
  id = "",
  name = "",
  className = "formGroup",
  title = "",
  options = [],
  initialOption = "",
  onChange = () => {},
}) => {
  return (
    <div className={className}>
      <label htmlFor={id}>{title}</label>
      <select name={name} id={id} onChange={onChange}>
        <option value="">{initialOption}</option>
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
