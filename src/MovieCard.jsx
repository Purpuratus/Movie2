import { Link } from "react-router-dom";
import "./MovieCard.css";

const FALLBACK_POSTER =
  "https://placehold.co/400x600/1c1922/7d778c?text=No+Poster";

export default function MovieCard({ movie }) {
  const poster = movie.Poster && movie.Poster !== "N/A" ? movie.Poster : FALLBACK_POSTER;

  return (
    <Link to={`/movie/${movie.imdbID}`} className="movie-card">
      <div className="movie-card-poster">
        <img src={poster} alt={`${movie.Title} poster`} loading="lazy" />
        <span className="movie-card-type">{movie.Type}</span>
      </div>
      <div className="movie-card-body">
        <h3>{movie.Title}</h3>
        <p className="movie-card-year">{movie.Year}</p>
      </div>
    </Link>
  );
}
