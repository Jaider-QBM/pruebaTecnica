import React from "react";
const Button = ({ type, children, disabled }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 mt-4 mb-3 font-semibold xl:text-xl"
    >
      {children}
    </button>
  );
};

export default Button;
