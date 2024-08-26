import React, { useEffect } from "react";
import Select from "react-select";

const SearchableSelect = ({
  label,
  options,
  value,
  onChange,
  className,
  error,
}) => {
  // Custom styles for the select component
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      borderColor: state.isFocused ? "#A7C957" : error ? "#dd0000" : "#D1D5DB", // Focused border color
      boxShadow: state.isFocused ? "0 0 0 1px #A7C957" : "none",
      "&:hover": {
        borderColor: state.isFocused ? "#A7C957" : "#D1D5DB",
      },
      padding: "5px",
      borderRadius: "8px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#A7C957" // Selected option background color
        : state.isFocused
        ? "#E5E7EB" // Focused option background color
        : state.isActive
        ? "#A7C957" // Active (clicked) option background color
        : "white", // Default background color
      color: state.isSelected ? "white" : "#374151", // Text color based on selection
      padding: "10px",
      cursor: "pointer",
      "&:active": {
        backgroundColor: "#e9f5db", // Background color when clicked
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#606C38", // Color of the selected value
    }),
  };
  useEffect(() => {});
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label
          htmlFor="searchable-select"
          className="mb-2 font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <Select
        id="searchable-select"
        options={options}
        className={className}
        value={value}
        onChange={onChange}
        styles={customStyles} // Applying custom styles
        placeholder="Select an option..."
      />
    </div>
  );
};

export default SearchableSelect;
