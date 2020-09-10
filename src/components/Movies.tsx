import React, { useState, useEffect } from "react";
import { getMovies } from "../services/fakeMovieService";
import { MoviesTable } from "./MoviesTable";
import { Pagination } from "./common/Pagination";
import { Paginate } from "../utils/Paginate";
import { ListGroup } from "../components/common/ListGroup";
import { getGenres } from "../services/fakeGenreService";
import { SearchBox } from "./common/SearchBox";
import _ from "lodash";
import { NavLink } from "react-router-dom";
export const Movies = () => {
  const [state, setState] = useState({
    searchQuery: "",
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
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

    let filtered = allMovies;
    if (searchQuery) {
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = Paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };
  const handleGenreSelect = (genre: any) => {
    console.log(genre + " selected");
    setState({
      ...state,
      selectedGenre: genre,
      currentPage: 1,
      searchQuery: ""
    });
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
  const { pageSize, currentPage, sortColumn, searchQuery } = state;

  const handleSort = (sortColumn: any) => {
    setState({ ...state, sortColumn });
  };
  const handleSearch = (query) => {
    setState({
      ...state,
      searchQuery: query,
      selectedGenre: null,
      currentPage: 1
    });
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
        <NavLink to="/movies/new">
          <button className="btn btn-primary mb-3">New Movie</button>
        </NavLink>
        <p>Showing {totalCount} movies in the database</p>
        <SearchBox value={searchQuery} onChange={handleSearch} />
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
