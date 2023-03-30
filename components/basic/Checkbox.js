import React from "react";

const Checkbox = ({ label, name, checked, onChange, className }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-indigo-600 border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <label className="block ml-2 text-gray-700">{label}</label>
    </div>
  );
};

export default Checkbox;
