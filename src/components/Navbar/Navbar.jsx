import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function NavBar({ watchlistCount = 0 }) {
  return (
    <nav className="nav">
      <div className="nav__brand">Movies</div>
      <div className="nav__links">
        <NavLink
          to="/movies"
          end
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/watchlist"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Watchlist{watchlistCount ? ` (${watchlistCount})` : ""}
        </NavLink>
      </div>
    </nav>
  );
}
