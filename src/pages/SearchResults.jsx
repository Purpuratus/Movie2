import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { searchMovies } from "../api/omdb";
import SearchBar from "../components/SearchBar";
import SortSelect, { sortMovies } from "../components/SortSelect";
import YearRangeSlider from "../components/YearRangeSlider";
import MovieGrid from "../components/MovieGrid";
import "./SearchResults.css";

const TYPE_OPTIONS = [
  { value: "", label: "All types" },
  { value: "movie", label: "Movies" },
  { value: "series", label: "Series" },
  { value: "episode", label: "Episodes" },
];
const CURRENT_YEAR = new Date().getFullYear();

function parseYear(year) {
  const match = String(year).match(/\d{4}/);
  return match ? Number(match[0]) : null;
}

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";

  const [type, setType] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [yearBounds, setYearBounds] = useState([1950, CURRENT_YEAR]);
  const [yearRange, setYearRange] = useState([1950, CURRENT_YEAR]);

  // A fresh search term resets pagination + filters back to defaults.
  useEffect(() => {
    setPage(1);
    setType("");
    setSortBy("relevance");
  }, [query]);

  useEffect(() => {
    if (!query) return;
    let cancelled = false;

    async function run() {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      setError("");

      try {
        const { results, totalResults: total } = await searchMovies(
          query,
          page,
          type
        );
        if (cancelled) return;
        setTotalResults(total);
        setMovies((prev) => {
          const next = page === 1 ? results : [...prev, ...results];
          const years = next.map((m) => parseYear(m.Year)).filter(Boolean);
          if (years.length) {
            const bounds = [Math.min(...years), Math.max(...years)];
            setYearBounds(bounds);
            setYearRange(bounds);
          }
          return next;
        });
      } catch (err) {
        if (cancelled) return;
        setError(err.message || "Something went wrong.");
        if (page === 1) setMovies([]);
      } finally {
        if (!cancelled) {
          setLoading(false);
          setLoadingMore(false);
        }
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [query, type, page]);

  function handleSearch(term) {
    navigate(`/search?q=${encodeURIComponent(term)}`);
  }

  function handleTypeChange(nextType) {
    setPage(1);
    setType(nextType);
  }

  const filteredMovies = useMemo(() => {
    const [min, max] = yearRange;
    return movies.filter((m) => {
      const y = parseYear(m.Year);
      return y === null || (y >= min && y <= max);
    });
  }, [movies, yearRange]);

  const displayedMovies = sortMovies(filteredMovies, sortBy);
  const canLoadMore = !loading && movies.length < totalResults;

  return (
    <>
      <section className="results-banner">
        <div className="results-banner-inner">
          <p className="eyebrow">Browse</p>
          <h1>Browse the reel</h1>
          <SearchBar initialValue={query} onSearch={handleSearch} />
        </div>
      </section>

      <div className="sprocket-strip" aria-hidden="true"></div>

      <section className="results">
        <div className="results-toolbar">
          <div className="results-heading">
            <h2>{error ? "Results" : `Search results for “${query}”`}</h2>
            {!error && !loading && (
              <span className="results-count">
                {totalResults.toLocaleString()} found
              </span>
            )}
          </div>
          <div className="results-controls">
            {yearBounds[0] < yearBounds[1] && (
              <YearRangeSlider
                bounds={yearBounds}
                value={yearRange}
                onChange={setYearRange}
              />
            )}
            <label className="type-filter">
              <span className="sort-select-label">Type</span>
              <select
                value={type}
                onChange={(e) => handleTypeChange(e.target.value)}
              >
                {TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
            <SortSelect value={sortBy} onChange={setSortBy} />
          </div>
        </div>

        {error && (
          <div className="state-panel">
            <p className="state-panel-title">No matches</p>
            <p>{error}</p>
          </div>
        )}

        {!error && (
          <>
            <MovieGrid movies={displayedMovies} loading={loading} />
            {!loading && displayedMovies.length === 0 && (
              <div className="state-panel">
                <p className="state-panel-title">Nothing here yet</p>
                <p>Try a different title, type, or year range.</p>
              </div>
            )}
            {canLoadMore && (
              <div className="load-more">
                <button
                  className="btn btn-ghost"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={loadingMore}
                >
                  {loadingMore ? "Loading…" : "Load more"}
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
