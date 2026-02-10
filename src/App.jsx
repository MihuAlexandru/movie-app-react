import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { fetchMovies } from "./api/moviesApi";
import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";
import useWatchlist from "./hooks/useWatchList";
import NavBar from "./components/Navbar";

export default function App() {
  const [status, setStatus] = useState("idle");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const { ids: watchlist, has, toggle } = useWatchlist();

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

  return (
    <div className="app">
      <NavBar watchlistCount={watchlist.length} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              movies={movies}
              status={status}
              error={error}
              onRetry={retry}
              hasWatch={has}
              onToggleWatch={toggle}
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
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <footer className="app-footer">
        <small>Watchlist is saved locally in your browser.</small>
      </footer>
    </div>
  );
}
