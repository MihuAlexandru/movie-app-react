import SortButton from "./SortButton";

export default function SortControls({ sort, onChange }) {
  return (
    <div className="sort-controls" role="group" aria-label="Sort movies">
      <span className="sort-label">Sort:</span>
      <SortButton
        sort={sort}
        onChange={onChange}
        title="Alphabetical (A→Z)"
        className="title-asc"
        value="A→Z"
      />
      <SortButton
        sort={sort}
        onChange={onChange}
        title="Alphabetical (Z→A)"
        className="title-desc"
        value="(Z→A)"
      />
      <SortButton
        sort={sort}
        onChange={onChange}
        title="Rating low to high"
        className="rating-asc"
        value="Rating ↑"
      />
      <SortButton
        sort={sort}
        onChange={onChange}
        title="Rating high to low"
        className="rating-desc"
        value="Rating ↓"
      />
    </div>
  );
}
