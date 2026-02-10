export default function MovieCard({
  movie,
  inWatchlist,
  onToggleWatchlist,
  onOpen,
}) {
  const { id, title, image, genre, rating } = movie;
  const imgSrc = `/images/${image}`;

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen?.(movie);
    }
  };

  return (
    <article
      className="movie-card"
      role="button"
      tabIndex={0}
      onClick={() => onOpen?.(movie)}
      onKeyDown={handleKeyDown}
    >
      <div className="movie-card__media">
        <img
          src={imgSrc}
          alt={`${title} poster`}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "/images/default.jpg";
          }}
        />
      </div>

      <div className="movie-card__body">
        <h3 className="movie-card__title">{title}</h3>
        <div className="movie-card__meta">
          <span className="movie-card__genre">{genre}</span>
          <span className="movie-card__rating">⭐ {rating}</span>
        </div>
      </div>

      <div className="movie-card__actions">
        {onToggleWatchlist && (
          <button
            className={`btn ${inWatchlist ? "btn--secondary" : "btn--primary"}`}
            onClick={(e) => {
              e.stopPropagation(); // keep card click from opening the modal
              onToggleWatchlist(id);
            }}
            aria-pressed={inWatchlist}
          >
            {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
          </button>
        )}
      </div>
    </article>
  );
}
