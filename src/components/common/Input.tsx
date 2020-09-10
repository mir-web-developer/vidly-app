import React from "react";

export const Input = ({
  name,
  label,
  value,
  error,
  type,
  options,
  typeOfInput,
  onChange
}: any) => {
  return (
    <>
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        {type === "select" ? (
          <div className="input-group">
            <select id={name}name={name} value={value} onChange={onChange}  className="custom-select" id="inputGroupSelect04">
              <option></option>
              {options.map((option) => {
                return (
                  <option key={option.id} value={option.name}>
                    {option.name}
                  </option>
                );
              })}
            </select>
          </div>
        ) : (
          <input
            name={name}
            autoFocus
            value={value}
            onChange={onChange}
            id={name}
            type={typeOfInput}
            className="form-control"
          />
        )}

        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </>
  );
};
