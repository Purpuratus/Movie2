import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  function handleSearch(term) {
    navigate(`/search?q=${encodeURIComponent(term)}`);
  }

  return (
    <section className="landing">
      <div className="landing-mark" aria-hidden="true">
        ●
      </div>
      <h1 className="landing-title">
        REEL<span className="hero-title-accent">FAST</span>
      </h1>
      <p className="landing-sub">Search any movie, show, or episode.</p>
      <SearchBar onSearch={handleSearch} size="lg" autoFocus />
      <LandingArt />
    </section>
  );
}

// A small, quiet decoration under the cover-page search bar: a
// spotlight beam behind a clapperboard silhouette. Pure CSS/SVG,
// no external assets.
function LandingArt() {
  return (
    <svg
      className="landing-art"
      viewBox="0 0 260 160"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="spot" cx="50%" cy="0%" r="75%">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="130" cy="20" rx="150" ry="90" fill="url(#spot)" />
      <g transform="translate(85 55)">
        <rect
          x="0"
          y="18"
          width="90"
          height="62"
          rx="6"
          fill="var(--bg-raised)"
          stroke="var(--line)"
        />
        <path
          d="M0 18 L14 0 H86 L100 18 Z"
          fill="var(--bg-raised-2)"
          stroke="var(--line)"
          transform="translate(-5 0)"
        />
        <g stroke="var(--gold-dim)" strokeWidth="6">
          <line x1="6" y1="9" x2="18" y2="-3" />
          <line x1="24" y1="9" x2="36" y2="-3" />
          <line x1="42" y1="9" x2="54" y2="-3" />
          <line x1="60" y1="9" x2="72" y2="-3" />
        </g>
      </g>
    </svg>
  );
}
