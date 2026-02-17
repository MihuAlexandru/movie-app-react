import { Outlet } from "react-router-dom";
import useWatchlist from "../hooks/useWatchList";
import NavBar from "../components/Navbar/Navbar";

export default function Layout() {
  const { ids: watchlist } = useWatchlist();

  return (
    <>
      <NavBar watchlistCount={watchlist.length} />
      <Outlet />
    </>
  );
}
