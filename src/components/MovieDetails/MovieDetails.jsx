import "./MovieDetails.css";

export default function MovieDetails({
  movie,
  hasWatch,
  onToggleWatch,
  onClose,
}) {
  if (!movie) return null;

  const { id, title, image, genre, rating } = movie;
  const imgSrc = `/images/${image}`;

  return (
    <div>
      <div className="movie-details__header">
        <img
          className="movie-details__poster"
          src={imgSrc}
          alt={`${title} poster`}
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
        <div>
          <h3 className="movie-details__title">{title}</h3>
          <p className="movie-details__meta">
            Genre: <strong>{genre}</strong>
          </p>
          <p className="movie-details__meta movie-details__meta--spaced">
            Rating: <strong>⭐ {rating}</strong>
          </p>
        </div>
      </div>

      <div className="movie-details__actions">
        <button
          className="btn btn--primary"
          onClick={() => onToggleWatch?.(id)}
        >
          {hasWatch?.(id) ? "Remove from Watchlist" : "Add to Watchlist"}
        </button>

        <button className="btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
