import React from "react";

const Select = ({ label, name, value, options, onChange, className }) => {
    return (
        <div className={`w-full ${className}`}>
            <label className="block mb-1 text-gray-700">{label}</label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
export default Select;