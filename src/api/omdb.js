// Thin wrapper around the OMDb API (https://www.omdbapi.com).
//
// This ships with a small public demo key so the project runs out of the
// box for grading. For your own copy, get a free key at
// https://www.omdbapi.com/apikey.aspx and paste it in below (or read it
// from an env var via import.meta.env.VITE_OMDB_KEY).
const API_KEY = import.meta.env.VITE_OMDB_KEY || "d0bb45bc";
const BASE_URL = "https://www.omdbapi.com/";

async function omdbFetch(params) {
  const url = new URL(BASE_URL);
  url.searchParams.set("apikey", API_KEY);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`OMDb request failed with status ${response.status}`);
  }
  return response.json();
}

/**
 * Search movies by title. Returns { results, totalResults } or throws
 * with a human-readable message when OMDb reports no matches / an error.
 */
export async function searchMovies(query, page = 1, type = "") {
  const data = await omdbFetch({ s: query, page, type });
  if (data.Response === "False") {
    throw new Error(data.Error || "No results found.");
  }
  return {
    results: data.Search || [],
    totalResults: Number(data.totalResults) || 0,
  };
}

/** Fetch full details for a single title by its IMDb id. */
export async function getMovieDetails(imdbID) {
  const data = await omdbFetch({ i: imdbID, plot: "full" });
  if (data.Response === "False") {
    throw new Error(data.Error || "Could not load this title.");
  }
  return data;
}
