import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="sprocket-strip" aria-hidden="true"></div>
      <div className="footer-inner">
        <div>
          <p className="footer-brand">REELFAST</p>
          <p className="footer-note">
            A React final-project build: search, sort, and drill into full
            details for any title.
          </p>
        </div>
        <div className="footer-meta">
          <p>Movie data and posters courtesy of the OMDb API.</p>
          <p>© {new Date().getFullYear()} ReelFast. Built for coursework.</p>
        </div>
      </div>
    </footer>
  );
}
