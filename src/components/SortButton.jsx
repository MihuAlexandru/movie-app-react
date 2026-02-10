export default function SortButton({
  sort,
  className,
  title,
  value,
  onChange,
}) {
  const set = (value) => () => onChange(value);
  return (
    <button
      type="button"
      className={`btn ${sort === className ? "btn--active" : ""}`}
      onClick={set(className)}
      title={title}
    >
      {value}
    </button>
  );
}
