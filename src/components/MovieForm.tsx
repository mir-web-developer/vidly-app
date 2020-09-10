import React, { useState, useEffect } from "react";
import { Input } from "./common/Input";
import Joi from "joi-browser";
import { getMovie, saveMovie } from "../services/fakeMovieService";

export const MovieForm = (props: any) => {
  const [state, setState] = useState({
    account: { title: "", genre: "", numberInStock: null, rate: null },
    errors: {},
    options: [
      { id: 1, name: "Action" },
      { id: 2, name: "Comedy" },
      { id: 3, name: "Thirller" }
    ]
  });

  const schema = {
    title: Joi.string().required().label("Title"),
    genre: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in stock"),
    rate: Joi.number().required().min(0).max(10).label("Rate")
  };

  useEffect(() => {
    const movieId = props.match.params.id;
    if (movieId === "new") return;
    console.log(movieId);
    const movie = getMovie(1); /////////////////////// <<<<<<<<!!!!!!!!!!!!!!!!!
    if (!movie) return props.history.replace("/not-found");
    setState({ ...state, account: mapToViewModel(movie) });
  }, []);

  const mapToViewModel = (movie: any) => {
    return {
      id: movie.id,
      title: movie.title,
      genre: movie.genre.name,
      numberInStock: movie.numberInStock,
      rate: movie.dailyRentalRate
    };
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
    saveMovie(state.account);

    props.history.push("/");
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
    // console.log(state);
  };

  const { account, errors, options } = state;

  return (
    <div>
      <h1> Movie Form </h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="title"
          value={account.title}
          onChange={handleChange}
          label="Title"
          error={errors.title}
        />
        <Input
          name="genre"
          value={account.genre}
          onChange={handleChange}
          label="Genre"
          error={errors.genre}
          type="select"
          options={options}
        />
        <Input
          name="numberInStock"
          value={account.numberInStock}
          onChange={handleChange}
          label="Number in Stock"
          error={errors.numberInStock}
          typeOfInput="number"
        />
        <Input
          name="rate"
          value={account.rate}
          onChange={handleChange}
          label="Rate"
          error={errors.rate}
        />
        <button disabled={validate()} className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};
