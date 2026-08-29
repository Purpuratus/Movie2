import { useEffect, useRef, useState } from "react";
import "./SearchBar.css";

export default function SearchBar({
  initialValue = "",
  onSearch,
  size = "md",
  autoFocus = false,
}) {
  const [term, setTerm] = useState(initialValue);
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = term.trim();
    if (trimmed) onSearch(trimmed);
  }

  return (
    <form
      className={`search-bar search-bar-${size}`}
      onSubmit={handleSubmit}
      role="search"
    >
      <span className="search-bar-notch" aria-hidden="true">
        ✂
      </span>
      <input
        ref={inputRef}
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search a title… “dune”, “spirited away”, “heat”"
        aria-label="Search movies by title"
      />
      <button type="submit" className="btn btn-gold search-bar-btn">
        Search
      </button>
    </form>
  );
}
