import React, { useEffect, useRef, useState } from "react";
import { showInfoPopup } from "../../redux/actions";
import { useDispatch } from "react-redux";

const Input = ({
  type = "text", // default type is "text"
  focusedIconName,
  defaultIconName,
  placeholder,
  className,
  label,
  onChange,
  value,
  error,
  innerClass,
  maxLength,
  clearIcon,
  counter,
  pretext,
  suftext,
  customIcon,
  disable,
  handleKeyDown,
  min,
  max,
  name,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [numberError, setNumberError] = useState(false);

  const input = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (disable) {
      input.current.disabled = true;
    } else {
      input.current.disabled = false;
    }
  }, [disable]);

  return (
    <div className={`input-container  ${isFocused ? "focused" : ""}`}>
      {label && (
        <label className="block dm-sans-700 text-green-default font-medium mb-2">
          {label}
        </label>
      )}
      <div
        className={`input_box ${innerClass} border-gray-300 box-border border py-2 px-2 h-12 rounded-lg  outline-none   ${
          (error || numberError) && "!border-red-500"
        } ${isFocused && "border-green-default-focus"} ${
          disable ? "input-disabled" : ""
        }`}
      >
        {pretext && <p className="input-pretext">{pretext}</p>}
        <input
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => {
            if (type === "number") {
              if (
                /^[0-9]+$/.test(e.target.value) ||
                e.target.value.length == 0
              ) {
                onChange(e.target.value);
              } else {
                dispatch(
                  showInfoPopup(
                    "error",
                    "This field accepts only numbers",
                    1500
                  )
                );
                setNumberError(true);
                setTimeout(() => {
                  setNumberError(false);
                }, 1500);
              }
            } else if (type === "text") {
              onChange(e.target.value);
            }
          }}
          value={value ? value : ""}
          className={` ${className} outline-none w-full h-full`}
          ref={input}
          maxLength={maxLength}
          onKeyDown={handleKeyDown}
          min={min}
          max={max}
          name={name}
        />
        {suftext && <p className="input-pretext">{suftext}</p>}
        {counter && counter}
      </div>
    </div>
  );
};

export default Input;
