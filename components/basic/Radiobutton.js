import React from "react";

const RadioButton = ({ name, options, value, onChange }) => {
  return (
    <div className="flex flex-col space-y-2">
      {options.map((option, index) => (
        <label key={index} className="flex items-center space-x-2">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={option.value === value}
            onChange={onChange}
            className="form-radio text-blue-500 h-5 w-5"
          />
          <span className="text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioButton;
