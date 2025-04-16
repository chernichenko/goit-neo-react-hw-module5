import { Link, useLocation } from "react-router-dom";

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul>
      {movies.map(({ id, title }) => (
        <li key={id}>
          <Link to={`/movies/${id}`} state={location}>{title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;