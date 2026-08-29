import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="state-panel" style={{ marginTop: "2.4rem" }}>
      <p className="state-panel-title">Reel not found</p>
      <p>That page doesn't exist.</p>
      <Link to="/" className="btn btn-ghost" style={{ marginTop: "1rem", display: "inline-block" }}>
        ← Back to search
      </Link>
    </div>
  );
}
