import React from "react";

function Input({
  name = "text",
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
}) {
  return (
    <>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className}
      />
    </>
  );
}

export default Input;
