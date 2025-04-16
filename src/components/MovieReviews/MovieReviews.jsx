import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ACCESS_TOKEN } from "../../constants";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });
        setReviews(response.data.results);
      } catch (err) {
        setError("No reviews found");
      }
    };
    fetchReviews();
  }, [movieId]);

  if (!reviews.length) return <p>{error}</p>;

  return (
    <ul>
      {reviews.map(review => (
        <li key={review.id}>
          <h4>{review.author}</h4>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;