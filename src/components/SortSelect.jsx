import "./SortSelect.css";

export const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "title-asc", label: "Title A → Z" },
  { value: "title-desc", label: "Title Z → A" },
  { value: "year-desc", label: "Year: newest first" },
  { value: "year-asc", label: "Year: oldest first" },
];

export function sortMovies(movies, sortBy) {
  const list = [...movies];
  switch (sortBy) {
    case "title-asc":
      return list.sort((a, b) => a.Title.localeCompare(b.Title));
    case "title-desc":
      return list.sort((a, b) => b.Title.localeCompare(a.Title));
    case "year-asc":
      return list.sort((a, b) => parseYear(a.Year) - parseYear(b.Year));
    case "year-desc":
      return list.sort((a, b) => parseYear(b.Year) - parseYear(a.Year));
    default:
      return list;
  }
}

function parseYear(year) {
  const match = String(year).match(/\d{4}/);
  return match ? Number(match[0]) : 0;
}

export default function SortSelect({ value, onChange }) {
  return (
    <label className="sort-select">
      <span className="sort-select-label">Sort by</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
