const API_KEY = "5f9c1f62";
const BASE_URL = "https://www.omdbapi.com/";

export const searchMovies = async (query) => {
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}`);
  return await res.json();
};

export const getMovieDetails = async (id) => {
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}`);
  return await res.json();
};
