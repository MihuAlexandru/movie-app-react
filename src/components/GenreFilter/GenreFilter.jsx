import "./GenreFilter.css";
export default function GenreFilter({ genres, selected, onChange }) {
  return (
    <div className="genre-filter" role="group" aria-label="Filter by genre">
      <button
        type="button"
        className={`chip ${!selected ? "chip--active" : ""}`}
        onClick={() => onChange(null)}
      >
        All
      </button>
      {genres.map((g) => (
        <button
          type="button"
          key={g}
          className={`chip ${selected === g ? "chip--active" : ""}`}
          onClick={() => onChange(g)}
        >
          {g}
        </button>
      ))}
    </div>
  );
}
