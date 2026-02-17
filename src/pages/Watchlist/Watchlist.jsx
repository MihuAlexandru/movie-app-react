import { useMemo } from "react";
import MovieList from "../../components/MovieList/MovieList";
import ErrorState from "../../components/ErrorState";
import EmptyState from "../../components/EmptyState";
import { Link, useNavigate } from "react-router-dom";
import "./Watchlist.css";

export default function Watchlist({
  movies,
  status,
  error,
  onRetry,
  watchlistIds,
  hasWatch,
  onToggleWatch,
}) {
  const navigate = useNavigate();
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
      <h2 className="watchlist-title">My Watchlist</h2>
      <MovieList
        movies={list}
        isInWatchlist={hasWatch}
        onToggleWatchlist={onToggleWatch}
        onOpenMovie={(movie) =>
          navigate(`/movies/${movie.id}`, {
            state: { from: location.pathname + location.search },
          })
        }
      />
      <div className="back-home">
        <Link to="/" className="btn btn--primary">
          Back to Home
        </Link>
      </div>
    </>
  );
}
