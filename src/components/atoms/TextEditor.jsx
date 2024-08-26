import React from "react";

const TextEditor = ({ label, value, onChange, error, className }) => (
  <div className="flex flex-col space-y-1 ">
    {label && <label className="text-gray-700 font-medium">{label}</label>}
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`border py-2 px-4 rounded-lg w-full outline-none mt-1 ${
        error ? "border-red-500" : "border-gray-300"
      } ${className}`}
      rows="5"
    />
  </div>
);

export default TextEditor;
