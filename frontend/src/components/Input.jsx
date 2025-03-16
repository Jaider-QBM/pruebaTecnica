import React from "react";
const Input = ({ label, type, placeholder, value, onChange, error }) => {
  return (
    <div className="mb-4">
      <label htmlFor={label} className="text-lg font-medium">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3"
      />
      {error && 
        <p className="text-red-500 w-full bg-red-900/40 py-1 px-2 font-medium text-base border-x-4 border-b-4 rounded-b-lg ">
          {error}
        </p>
      }
    </div>
  );
};

export default Input;
