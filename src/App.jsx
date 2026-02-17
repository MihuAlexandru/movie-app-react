import { useEffect, useState, useCallback } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { fetchMovies } from "./api/moviesApi";
import Home from "./pages/Home/Home";
import Watchlist from "./pages/Watchlist/Watchlist";
import useWatchlist from "./hooks/useWatchList";
import Modal from "./components/Modal/Modal";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import Layout from "./pages/Layout";
import MovieDetailPage from "./pages/MovieDetailPage";

export default function App() {
  const [status, setStatus] = useState("idle");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { ids: watchlist, has, toggle } = useWatchlist();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    async function load() {
      setStatus("loading");
      setError(null);
      try {
        const data = await fetchMovies(false, 1000);
        if (!mounted) return;
        setMovies(data);
        setStatus("success");
      } catch (err) {
        if (!mounted) return;
        setError(err?.message || "unknown error");
        setStatus("error");
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const retry = () => {
    setStatus("loading");
    setError(null);
    fetchMovies()
      .then((data) => {
        setMovies(data);
        setStatus("success");
      })
      .catch((err) => {
        setError(err?.message || "Unknown error");
        setStatus("error");
      });
  };

  const openMovie = useCallback((movie) => setSelectedMovie(movie), []);

  const location = useLocation();

  const closeMovie = useCallback(() => {
    setSelectedMovie(null);

    const fromPath = location.state?.from;
    const isMovieDetail = /^\/movies\/\d+$/.test(location.pathname);

    if (isMovieDetail && fromPath) {
      navigate(fromPath);
    } else if (isMovieDetail) {
      navigate("/movies");
    } else {
      navigate(-1);
    }
  }, [navigate, location.pathname, location.state]);

  return (
    <div className="app">
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/movies"
            element={
              <Home
                movies={movies}
                status={status}
                error={error}
                onRetry={retry}
                hasWatch={has}
                onToggleWatch={toggle}
                onOpenMovie={openMovie}
              />
            }
          />
          <Route
            path="/movies/:id"
            element={
              <MovieDetailPage
                status={status}
                movies={movies}
                onOpenMovie={openMovie}
              />
            }
          />
          <Route
            path="/watchlist"
            element={
              <Watchlist
                movies={movies}
                status={status}
                error={error}
                onRetry={retry}
                watchlistIds={watchlist}
                hasWatch={has}
                onToggleWatch={toggle}
                onOpenMovie={openMovie}
              />
            }
          />
          <Route path="*" element={<Navigate to="/movies" replace />} />
        </Route>
      </Routes>
      <Modal
        isOpen={!!selectedMovie}
        title={selectedMovie?.title || "Movie details"}
        onClose={closeMovie}
        closeOnBackdrop={true}
      >
        <MovieDetails
          movie={selectedMovie}
          hasWatch={has}
          onToggleWatch={toggle}
        />
      </Modal>
      <footer className="app-footer">
        <small>Watchlist is saved locally in your browser.</small>
      </footer>
    </div>
  );
}
