import { useEffect, useState } from "react";

const STORAGE_KEY = "watchlist";

export default function useWatchlist() {
  const [ids, setIds] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      //
    }
  }, [ids]);

  const has = (id) => ids.includes(id);
  const toggle = (id) =>
    setIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  return { ids, has, toggle };
}
