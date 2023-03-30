import React from "react";

const Button = ({ label, type, onClick, className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
