import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function MovieDetailPage({ movies, onOpenMovie }) {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const movie = movies.find((m) => m.id === parseInt(id));
    if (movie) {
      onOpenMovie(movie);
    } else {
      navigate("/movies");
    }
  }, [id, movies, onOpenMovie, navigate]);

  return null;
}
