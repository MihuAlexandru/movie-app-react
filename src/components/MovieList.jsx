import MovieCard from "./MovieCard";

export default function MovieList({
  movies,
  isInWatchlist,
  onToggleWatchlist,
  onOpenMovie,
}) {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          inWatchlist={isInWatchlist?.(movie.id)}
          onToggleWatchlist={onToggleWatchlist}
          onOpen={onOpenMovie}
        />
      ))}
    </div>
  );
}
