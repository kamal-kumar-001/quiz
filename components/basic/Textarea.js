import React from "react";

const Textarea = ({ label, name, value, placeholder, onChange, className }) => {
  return (
    <div className={`w-full ${className}`}>
      <label className="block mb-1 text-gray-700">{label}</label>
      <textarea
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
      ></textarea>
    </div>
  );
};

export default Textarea;
