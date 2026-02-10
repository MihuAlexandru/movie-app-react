import { useMemo } from "react";
import MovieList from "../components/MovieList";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";
import { Link } from "react-router-dom";

export default function Watchlist({
  movies,
  status,
  error,
  onRetry,
  watchlistIds,
  hasWatch,
  onToggleWatch,
  onOpenMovie,
}) {
  const list = useMemo(
    () => movies.filter((m) => watchlistIds.includes(m.id)),
    [movies, watchlistIds],
  );

  if (status === "loading") {
    return (
      <div className="app-loading">
        <div className="spinner"></div>
        <p>Loading movies…</p>
      </div>
    );
  }

  if (status === "error") {
    return <ErrorState message={error} onRetry={onRetry} />;
  }

  if (list.length === 0) {
    return (
      <EmptyState
        title="Your watchlist is empty"
        description="Add some movies from the Home page."
        ctaLabel="Browse movies"
        onCta={undefined}
      />
    );
  }

  return (
    <>
      <h2 style={{ margin: "0 0 1rem 0" }}>My Watchlist</h2>
      <MovieList
        movies={list}
        isInWatchlist={hasWatch}
        onToggleWatchlist={onToggleWatch}
        onOpenMovie={onOpenMovie}
      />
      <div style={{ marginTop: "1rem" }}>
        <Link to="/" className="btn btn--primary">
          Back to Home
        </Link>
      </div>
    </>
  );
}
