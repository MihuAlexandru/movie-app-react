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
    <div className="movie-details">
      <div className="movie-details__header">
        <img
          src={imgSrc}
          alt={`${title} poster`}
          style={{
            width: 160,
            height: 240,
            objectFit: "cover",
            borderRadius: 8,
            marginRight: 16,
          }}
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
        <div>
          <h3 style={{ margin: "0 0 .5rem 0" }}>{title}</h3>
          <p style={{ margin: 0, opacity: 0.85 }}>
            Genre: <strong>{genre}</strong>
          </p>
          <p style={{ margin: ".25rem 0 0 0", opacity: 0.85 }}>
            Rating: <strong>⭐ {rating}</strong>
          </p>
        </div>
      </div>

      <div style={{ marginTop: "1rem", display: "flex", gap: ".5rem" }}>
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
