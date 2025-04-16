import { useEffect, useState, useRef } from "react";
import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import { ACCESS_TOKEN } from "../../constants";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/movies");

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });
        setMovie(response.data);
      } catch (err) {
        setError("Movie not found");
      }
    };
    fetchDetails();
  }, [movieId]);

  if (!movie) return <p>{error ?? "Loading..."}</p>;

  return (
    <div style={{ padding: 20 }}>
      <Link to={backLinkRef.current}>&larr; Go back</Link>
      <div style={{ display: "flex", marginTop: 20 }}>
        <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
        <div style={{ marginLeft: 20 }}>
          <h2>{movie.title} ({movie.release_date.slice(0, 4)})</h2>
          <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>{movie.genres.map(g => g.name).join(" ")}</p>
        </div>
      </div>

      <div style={{ marginTop: 30 }}>
        <h3>Additional information</h3>
        <ul>
          <li><Link to="cast">Cast</Link></li>
          <li><Link to="reviews">Reviews</Link></li>
        </ul>
        <Outlet />
      </div>
    </div>
  );
};

export default MovieDetailsPage;
