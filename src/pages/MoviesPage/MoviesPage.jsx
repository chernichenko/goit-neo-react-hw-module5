import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import { ACCESS_TOKEN } from "../../constants";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}`, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });
        setMovies(response.data.results);
      } catch (err) {
        setError("Failed to load search results");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.elements.query.value.trim();
    if (value) setSearchParams({ query: value });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Search Movies</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="query" defaultValue={query} />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
