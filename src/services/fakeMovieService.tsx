const movies = [
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

export const getMovies = () => {
  return movies;
};
