import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ACCESS_TOKEN } from "../../constants";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });
        setCast(response.data.cast);
      } catch (err) {
        setError("No cast available");
      }
    };
    fetchCast();
  }, [movieId]);

  if (!cast.length) return <p>{error}</p>;

  return (
    <ul>
      {cast.map(actor => (
        <li key={actor.cast_id}>
          {actor.profile_path && (
            <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} />
          )}
          <p>{actor.name}</p>
          <p>Character: {actor.character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;