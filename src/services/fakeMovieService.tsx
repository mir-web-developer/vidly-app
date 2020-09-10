let movies = [
  {
    id: 1,
    title: "title",
    genre: { _id: "aklsdfj;alsk", name: "Action" },
    numberInStock: 1,
    dailyRentalRate: 2.5,
    publishDate: "2020-20",
    liked: true
  },
  {
    id: 2,
    title: "title",
    genre: { _id: "aklsdfj;alsk", name: "Comedy" },
    numberInStock: 2,
    dailyRentalRate: 2.5,
    publishDate: "2020-20"
  },
  {
    id: 3,
    title: "title",
    genre: { _id: "aklsdfj;alsk", name: "Thriller" },
    numberInStock: 3,
    dailyRentalRate: 2.5,
    publishDate: "2020-20"
  },
  {
    id: 4,
    title: "title",
    genre: { _id: "aklsdfj;alsk", name: "Comedy" },
    numberInStock: 4,
    dailyRentalRate: 2.5,
    publishDate: "2020-20"
  },
  {
    id: 5,
    title: "title",
    genre: { _id: "aklsdfj;alsk", name: "Thriller" },
    numberInStock: 5,
    dailyRentalRate: 2.5,
    publishDate: "2020-20"
  },
  {
    id: 6,
    title: "title",
    genre: { _id: "aklsdfj;alsk", name: "Action" },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    publishDate: "2020-20"
  }
];

// export const addMovies = (movie) => {
//   const newMovie = {
//     id: 7,
//     title: movie.title,
//     genre: { _id: 7, name: movie.genre },
//     numberInStock: movie.numberInStock,
//     dailyRentalRate: movie.rate,
//     publishDate: "20.20"
//   };
//   return movies.push(newMovie);
// };

export const saveMovie = (movie: any) => {
  let movieInDb = movies.find((m) => m.id === movie.id) || {};
  movieInDb.title = movie.title;
  movieInDb.genre.name = movie.genre;//<<<<<<<<<<<<<<<<<<<<<<!!!!!!!!!!!!
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.rate;
  if (!movieInDb.id) {
    movieInDb.id = Date.now().toString();
    movies.push(movieInDb);
  }
};
export const getMovies = () => {
  return movies;
};
export const getMovie = (id: any) => {
  return movies.find((movie) => movie.id === id);
};
