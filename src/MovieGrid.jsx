import MovieCard from "./MovieCard";
import SkeletonCard from "./SkeletonCard";
import "./MovieGrid.css";

export default function MovieGrid({ movies, loading, skeletonCount = 8 }) {
  if (loading) {
    return (
      <div className="movie-grid">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}
