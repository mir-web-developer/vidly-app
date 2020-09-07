import React, { useState, useEffect } from "react";
import { getMovies } from "../services/fakeMovieService";
import { MoviesTable } from "./MoviesTable";
import { Pagination } from "./common/Pagination";
import { Paginate } from "../utils/Paginate";
import { ListGroup } from "../components/common/ListGroup";
import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";
export const Movies = () => {
  const [state, setState] = useState({
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: {},
    sortColumn: { path: "title", order: "asc" }
  });

  const getPagedData = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies,
      sortColumn
    } = state;
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre.name === selectedGenre.name)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = Paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };
  const handleGenreSelect = (genre: any) => {
    console.log(genre + " selected");
    setState({ ...state, selectedGenre: genre, currentPage: 1 });
  };

  useEffect(() => {
    setState({ ...state, movies: getMovies(), genres: getGenres() });
  }, []);

  useEffect(() => {
    const genres = [{ name: "All Genres" }, ...getGenres()];
    setState({ ...state, movies: getMovies(), genres });
  }, []);

  const handleDelete = (movie: any) => {
    const movies = state.movies.filter((m) => m.id !== movie.id);
    setState({ ...state, movies });
  };
  const { length: count } = state.movies;
  if (count === 0) {
    return <p>There are no movies in the database</p>;
  }

  const handleLike = (movie: any) => {
    console.log("clicked", movie);
    const movies: any = [...state.movies];
    const index: any = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    setState({ ...state, movies });
  };

  const handlePageChange = (page: any) => {
    console.log(page);
    setState({ ...state, currentPage: page });
  };
  const { pageSize, currentPage, sortColumn } = state;

  const handleSort = (sortColumn: any) => {
    setState({ ...state, sortColumn });
  };

  const { totalCount, data: movies } = getPagedData();
  return (
    <div className="row">
      <div className="col-3">
        <ListGroup
          selectedItem={state.selectedGenre}
          onItemSelect={handleGenreSelect}
          items={state.genres}
        />
      </div>
      <div className="col">
        <p>Showing {totalCount} movies in the database</p>
        <MoviesTable
          sortColumn={sortColumn}
          movies={movies}
          onDelete={handleDelete}
          onLike={handleLike}
          onSort={handleSort}
        />
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};
