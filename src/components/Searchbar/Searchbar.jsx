import { useRef, useState } from "react";
import "./Searchbar.css";
export default function SearchBar({
  value,
  onChange,
  placeholder = "Search by title",
}) {
  const [localValue, setLocalValue] = useState(value ?? "");
  const isComposingRef = useRef(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isComposingRef.current) {
      e.preventDefault();
      onChange?.(localValue.trim());
    }
  };

  return (
    <div className="searchbar">
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onCompositionStart={() => {
          isComposingRef.current = true;
        }}
        onCompositionEnd={() => {
          isComposingRef.current = false;
        }}
        placeholder={placeholder}
        aria-label="Search movies"
      />
    </div>
  );
}
