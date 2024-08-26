import React from "react";
// Import the custom CSS

const Checkbox = ({ label, checked, onChange, error }) => {
  const checkboxId = `checkbox-${label.replace(/\s+/g, "-")}`; // Generate a unique ID based on the label

  return (
    <div className="flex items-center space-x-3">
      <input
        type="checkbox"
        id={checkboxId} // Assign the unique ID to the checkbox
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={`custom-checkbox`} // Apply the custom checkbox class
      />
      <label
        htmlFor={checkboxId} // Associate the label with the checkbox using the unique ID
        className={`custom-label ${error ? "custom-label-error" : ""}`} // Apply custom label classes
      >
        {label}
      </label>
      {error && <span className="custom-error-message">{error}</span>}
    </div>
  );
};

export default Checkbox;
