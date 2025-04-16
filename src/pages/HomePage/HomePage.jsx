import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import { ACCESS_TOKEN } from "../../constants";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://api.themoviedb.org/3/trending/movie/day", {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });
        setMovies(response.data.results);
      } catch (err) {
        setError("Failed to load trending movies");
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Trending Today</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default HomePage;