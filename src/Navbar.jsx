import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand">
          <span className="brand-mark">●</span>
          <span className="brand-word">REEL</span>
          <span className="brand-word brand-word-accent">FAST</span>
        </Link>
        <nav className="nav-links" aria-label="Primary">
          <Link to="/">Home</Link>
          <a
            href="https://www.omdbapi.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            Powered by OMDb
          </a>
        </nav>
      </div>
      <div className="sprocket-strip" aria-hidden="true"></div>
    </header>
  );
}
