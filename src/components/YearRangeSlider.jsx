import "./YearRangeSlider.css";

export default function YearRangeSlider({ bounds, value, onChange }) {
  const [boundMin, boundMax] = bounds;
  const [min, max] = value;
  const span = Math.max(boundMax - boundMin, 1);
  const pctMin = ((min - boundMin) / span) * 100;
  const pctMax = ((max - boundMin) / span) * 100;

  function handleMinChange(e) {
    const next = Math.min(Number(e.target.value), max - 1);
    onChange([next, max]);
  }

  function handleMaxChange(e) {
    const next = Math.max(Number(e.target.value), min + 1);
    onChange([min, next]);
  }

  return (
    <div className="year-range">
      <div className="year-range-label">
        <span className="sort-select-label">Year range</span>
        <span className="year-range-values">
          {min} – {max}
        </span>
      </div>
      <div className="year-range-slider">
        <div className="year-range-track" />
        <div
          className="year-range-fill"
          style={{ left: `${pctMin}%`, right: `${100 - pctMax}%` }}
        />
        <input
          type="range"
          min={boundMin}
          max={boundMax}
          value={min}
          onChange={handleMinChange}
          aria-label="Minimum year"
        />
        <input
          type="range"
          min={boundMin}
          max={boundMax}
          value={max}
          onChange={handleMaxChange}
          aria-label="Maximum year"
        />
      </div>
    </div>
  );
}
