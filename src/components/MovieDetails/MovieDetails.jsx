import "./MovieDetails.css";

export default function MovieDetails({ movie, hasWatch, onToggleWatch }) {
  if (!movie) return null;

  const { id, title, image, genre, rating, description } = movie;
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
            <strong> Genre: </strong> {genre}
          </p>
          <p className="movie-details__meta movie-details__meta--spaced">
            <strong> Rating: </strong>⭐ {rating}
          </p>
          <p className="movie-details__meta movie-details__meta--spaced">
            <strong> Description: </strong> {description}
          </p>
        </div>
      </div>

      <div className="movie-details__actions">
        <button
          className={`btn ${hasWatch?.(id) ? "btn--secondary" : "btn--primary"}`}
          onClick={() => onToggleWatch?.(id)}
        >
          {hasWatch?.(id) ? "Remove from Watchlist" : "Add to Watchlist"}
        </button>
      </div>
    </div>
  );
}
