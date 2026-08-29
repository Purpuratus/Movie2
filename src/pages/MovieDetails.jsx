import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieDetails } from "../api/omdb";
import "./MovieDetails.css";

const FALLBACK_POSTER =
  "https://placehold.co/500x750/1c1922/7d778c?text=No+Poster";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    setMovie(null);

    getMovieDetails(id)
      .then((data) => {
        if (!cancelled) setMovie(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Could not load this title.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="details-loading">
        <div className="skeleton-poster-lg" />
        <div className="details-loading-lines">
          <div className="skeleton-line skeleton-line-title" />
          <div className="skeleton-line skeleton-line-year" />
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="state-panel">
        <p className="state-panel-title">Could not load this title</p>
        <p>{error}</p>
        <Link to="/" className="btn btn-ghost details-back">
          ← Back to search
        </Link>
      </div>
    );
  }

  const poster = movie.Poster && movie.Poster !== "N/A" ? movie.Poster : FALLBACK_POSTER;
  const facts = [
    { label: "Runtime", value: movie.Runtime },
    { label: "Genre", value: movie.Genre },
    { label: "Rated", value: movie.Rated },
    { label: "Released", value: movie.Released },
    { label: "Director", value: movie.Director },
    { label: "Language", value: movie.Language },
    { label: "Country", value: movie.Country },
    { label: "Box office", value: movie.BoxOffice },
  ].filter((f) => f.value && f.value !== "N/A");

  return (
    <article className="details">
      <Link to="/" className="btn btn-ghost details-back">
        ← Back to search
      </Link>

      <div className="details-layout">
        <div className="details-poster">
          <img src={poster} alt={`${movie.Title} poster`} />
        </div>

        <div className="details-info">
          <p className="eyebrow">
            {movie.Type} · {movie.Year}
          </p>
          <h1>{movie.Title}</h1>

          {movie.Ratings?.length > 0 && (
            <ul className="ratings-list">
              {movie.Ratings.map((r) => (
                <li key={r.Source}>
                  <span className="ratings-source">{r.Source}</span>
                  <span className="ratings-value">{r.Value}</span>
                </li>
              ))}
            </ul>
          )}

          {movie.Plot && movie.Plot !== "N/A" && (
            <p className="details-plot">{movie.Plot}</p>
          )}

          <dl className="details-facts">
            {facts.map((f) => (
              <div key={f.label} className="details-fact">
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>

          {movie.Actors && movie.Actors !== "N/A" && (
            <p className="details-cast">
              <span className="details-cast-label">Cast </span>
              {movie.Actors}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
