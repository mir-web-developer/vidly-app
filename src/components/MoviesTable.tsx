import React from "react";
import { Like } from "./common/Like";
import { Table } from "./common/Table";
import {Link} from 'react-router-dom'

export const MoviesTable = (props:any) => {
  const { movies, sortColumn, onSort } = props;
  const columns = [
  { path: "title", label: "Title",content:(movie:any) => <Link to ={`/movies/${movie.id}`} >{movie.title}</Link> },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => props.onLike(movie)} />
      )
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => {
            props.onDelete(movie);
          }}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];

  return (
    <>
      <Table
        columns={columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    </>
  );
};
