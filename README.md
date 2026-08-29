# ReelFast (React)

A movie search app built for a React final project. Search the OMDb API,
sort and filter results, and open a full details page for any title.

## Requirements checklist

- **Homepage** — hero with a search bar + a responsive grid of results (`src/pages/Home.jsx`)
- **API search** — talks to the OMDb API (`src/api/omdb.js`)
- **Movie details page** — `/movie/:id` route with poster, plot, ratings, cast, etc. (`src/pages/MovieDetails.jsx`)
- **Filter/sort** — sort by title A–Z/Z–A or year newest/oldest, plus a type filter (movie/series/episode) (`src/components/SortSelect.jsx`)
- **Fully responsive** — grid drops from 4 → 3 → 2 columns, nav/search/detail layout stack on mobile (media queries throughout the `.css` files)
- **Standard structure** — `Navbar`, `<main>` content area with routed pages, and `Footer` (`src/components/Navbar.jsx`, `src/App.jsx`, `src/components/Footer.jsx`)

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build      # production build
```

## API key

A small public OMDb demo key is included in `src/api/omdb.js` so the app
runs immediately. For your own key (recommended for anything beyond a
class demo):

1. Get a free key at https://www.omdbapi.com/apikey.aspx
2. Create a `.env` file in the project root with:
   ```
   VITE_OMDB_KEY=your_key_here
   ```
3. Restart the dev server.

## Project structure

```
src/
├── api/omdb.js              → OMDb fetch helpers (search + details)
├── components/
│   ├── Navbar.jsx / .css
│   ├── Footer.jsx / .css
│   ├── SearchBar.jsx / .css
│   ├── SortSelect.jsx / .css  → sort options + sortMovies() helper
│   ├── MovieCard.jsx / .css
│   ├── SkeletonCard.jsx / .css → loading placeholder cards
│   └── MovieGrid.jsx / .css
├── pages/
│   ├── Home.jsx / .css       → search + filter + sort + grid + pagination
│   ├── MovieDetails.jsx / .css
│   └── NotFound.jsx
├── App.jsx                   → routes + page shell (Navbar/main/Footer)
├── main.jsx                  → BrowserRouter + render root
└── index.css                 → design tokens, shared layout/button styles
```

## Design

A cinema-marquee theme: deep charcoal background, bulb-gold accent, a
condensed display face for headings, and a recurring "sprocket hole" strip
motif used as a section divider. The search bar is shaped like a ticket
stub. Fully implemented in plain CSS with custom properties — no UI
framework.
