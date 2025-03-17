import React from "react";
import { ErrorMessage } from "./ErrorMessage";
const Input = ({ label, type, placeholder, value, onChange, error }) => {
  return (
    <div className="mb-4">
      <label htmlFor={label} className="xl:text-lg font-medium">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3"
      />
      {error &&
        <ErrorMessage message={error} />
      }
    </div>
  );
};

export default Input;
