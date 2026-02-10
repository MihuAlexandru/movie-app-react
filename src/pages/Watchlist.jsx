import { useMemo, useState } from "react";
import MovieList from "../components/MovieList";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";
import { Link } from "react-router-dom";
import MovieDetails from "../components/MovieDetails";
import Modal from "../components/Modal/Modal";

export default function Watchlist({
  movies,
  status,
  error,
  onRetry,
  watchlistIds,
  hasWatch,
  onToggleWatch,
}) {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const openMovie = (movie) => setSelectedMovie(movie);
  const closeModal = () => setSelectedMovie(null);

  const list = useMemo(
    () => movies.filter((m) => watchlistIds.includes(m.id)),
    [movies, watchlistIds],
  );

  if (status === "loading") {
    return (
      <div className="app-loading">
        <div className="spinner" aria-hidden="true"></div>
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
        onOpenMovie={openMovie}
      />
      <Modal
        isOpen={!!selectedMovie}
        title={selectedMovie?.title || "Movie details"}
        onClose={closeModal}
        closeOnBackdrop={true}
      >
        <MovieDetails
          movie={selectedMovie}
          hasWatch={hasWatch}
          onToggleWatch={onToggleWatch}
          onClose={closeModal}
        />
      </Modal>
      <div style={{ marginTop: "1rem" }}>
        <Link to="/" className="btn btn--primary">
          Back to Home
        </Link>
      </div>
    </>
  );
}
