import React from "react";

export const Input = ({ name, label, value, error, onChange }: any) => {
  return (
    <>
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          name={name}
          autoFocus
          value={value}
          onChange={onChange}
          id={name}
          type="text"
          className="form-control"
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </>
  );
};
