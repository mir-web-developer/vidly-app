import React, { useState } from "react";
import { Input } from "./common/Input";
import Joi from "joi-browser";

export const LoginForm = () => {
  const [state, setState] = useState({
    account: { username: "", password: "" },
    errors: {}
  });

  const schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password")
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(state.data, schema, options);
    if (!error) return null;
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();
    setState({ ...state, errors: errors || {} });
  };
  const validateProperty = ({ name, value }: any) => {
    const obj = { [name]: value };
    const schema2 = { [name]: schema[name] };
    const { error } = Joi.validate(obj, schema2);
    return error ? error.details[0].message : null;
  };
  const handleChange = ({ currentTarget: input }: any) => {
    const errors = { ...state.errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const account = { ...state.account };
    account[input.name] = input.value;
    setState({ ...state, account, errors });
    console.log(state);
  };

  const { account, errors } = state;
  return (
    <div>
      <h1> Login </h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="username"
          value={account.username}
          onChange={handleChange}
          label="Username"
          error={errors.username}
        />
        <Input
          name="password"
          value={account.password}
          onChange={handleChange}
          label="Password"
          error={errors.password}
        />
        <button disabled={validate()} className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};
