import { useMemo, useState } from "react";
import MovieList from "../components/MovieList";
import SearchBar from "../components/SearchBar";
import GenreFilter from "../components/GenreFilter";
import SortControls from "../components/SortControl";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";
import Modal from "../components/Modal/Modal";
import MovieDetails from "../components/MovieDetails";

export default function Home({
  movies,
  status,
  error,
  onRetry,
  hasWatch,
  onToggleWatch,
}) {
  const [query, setQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sort, setSort] = useState("title-asc");

  const [selectedMovie, setSelectedMovie] = useState(null);

  const openMovie = (movie) => setSelectedMovie(movie);
  const closeModal = () => setSelectedMovie(null);

  const genres = useMemo(() => {
    const set = new Set(movies.map((m) => m.genre).filter(Boolean));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [movies]);

  const filteredAndSorted = useMemo(() => {
    let list = movies;

    if (selectedGenre) {
      list = list.filter((m) => m.genre === selectedGenre);
    }

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((m) => m.title?.toLowerCase().includes(q));
    }

    const byTitleAsc = (a, b) => a.title.localeCompare(b.title);
    const byTitleDesc = (a, b) => b.title.localeCompare(a.title);
    const byRatingAsc = (a, b) => Number(a.rating) - Number(b.rating);
    const byRatingDesc = (a, b) => Number(b.rating) - Number(a.rating);

    const cmp =
      {
        "title-asc": byTitleAsc,
        "title-desc": byTitleDesc,
        "rating-asc": byRatingAsc,
        "rating-desc": byRatingDesc,
      }[sort] || byTitleAsc;

    return list.toSorted ? list.toSorted(cmp) : list.slice().sort(cmp);
  }, [movies, selectedGenre, query, sort]);

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

  return (
    <>
      <section className="app-controls">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search by title"
        />
        <GenreFilter
          genres={genres}
          selected={selectedGenre}
          onChange={setSelectedGenre}
        />
        <SortControls sort={sort} onChange={setSort} />
      </section>

      {filteredAndSorted.length > 0 ? (
        <MovieList
          movies={filteredAndSorted}
          isInWatchlist={hasWatch}
          onToggleWatchlist={onToggleWatch}
          onOpenMovie={openMovie}
        />
      ) : (
        <EmptyState
          title="No results"
          description="Try different keywords or clear the search."
          ctaLabel={query ? "Clear search" : undefined}
          onCta={query ? () => setQuery("") : undefined}
        />
      )}

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
    </>
  );
}
