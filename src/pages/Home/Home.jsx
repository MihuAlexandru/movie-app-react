import { useMemo } from "react";
import MovieList from "../../components/MovieList/MovieList";
import GenreFilter from "../../components/GenreFilter/GenreFilter";
import SortControls from "../../components/SortSection/SortSection";
import ErrorState from "../../components/ErrorState";
import EmptyState from "../../components/EmptyState";
import SearchBar from "../../components/Searchbar/SearchBar";
import "./Home.css";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Home({
  movies,
  status,
  error,
  onRetry,
  hasWatch,
  onToggleWatch,
}) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("search") || "";
  const sort = searchParams.get("order") || "title-asc";
  const genre = searchParams.get("genre") || "";

  const genres = useMemo(() => {
    const set = new Set(movies.map((m) => m.genre).filter(Boolean));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [movies]);

  const handleQueryChange = (newQuery) => {
    setSearchParams({ search: newQuery, order: sort, genre: genre });
  };

  const handleSortChange = (newSort) => {
    setSearchParams({ search: query, order: newSort, genre: genre });
  };

  const handleGenreChange = (newGenre) => {
    setSearchParams({ search: query, order: sort, genre: newGenre || "" });
  };

  const filteredAndSorted = useMemo(() => {
    let list = movies;

    if (genre) {
      list = list.filter((m) => m.genre === genre);
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
  }, [movies, genre, query, sort]);

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

  return (
    <>
      <section className="app-controls">
        <SearchBar
          value={query}
          onChange={handleQueryChange}
          placeholder="Search by title"
        />
        <SortControls sort={sort} onChange={handleSortChange} />
        <GenreFilter
          genres={genres}
          selected={genre}
          onChange={handleGenreChange}
        />
      </section>

      {filteredAndSorted.length > 0 ? (
        <MovieList
          movies={filteredAndSorted}
          isInWatchlist={hasWatch}
          onToggleWatchlist={onToggleWatch}
          onOpenMovie={(movie) => navigate(`/movies/${movie.id}`)}
        />
      ) : (
        <EmptyState
          title="No results"
          description="Try different keywords or clear the search."
          ctaLabel={query ? "Clear search" : undefined}
          onCta={query ? () => handleQueryChange("") : undefined}
        />
      )}
    </>
  );
}
