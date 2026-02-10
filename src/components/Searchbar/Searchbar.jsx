import "./Searchbar.css";
export default function SearchBar({
  value,
  onChange,
  placeholder = "Search by title",
}) {
  return (
    <div className="searchbar">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search movies"
      />
    </div>
  );
}
