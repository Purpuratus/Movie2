import "./SkeletonCard.css";

export default function SkeletonCard() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton-poster" />
      <div className="skeleton-line skeleton-line-title" />
      <div className="skeleton-line skeleton-line-year" />
    </div>
  );
}
