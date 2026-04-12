import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = () => {
      const favs = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(favs);
    };

    loadFavorites();

    window.addEventListener("favoritesUpdated", loadFavorites);

    return () => {
      window.removeEventListener("favoritesUpdated", loadFavorites);
    };
  }, []);

  return (
    <div>
      <h2>My Favorites ❤️</h2>

      {favorites.length === 0 && <p>No favorites yet.</p>}

      <div className="grid">
        {favorites.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
