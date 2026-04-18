// src/services/api.js
const API_KEY = "5f9c1f62";
const BASE_URL = "https://www.omdbapi.com/";

export const searchMovies = async (query) => {
  if (!query || query.trim().length < 2) return { Search: [] };

  const res = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`,
  );

  const data = await res.json();
  return data;
};

export const getMovieDetails = async (id) => {
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);

  return await res.json();
};
