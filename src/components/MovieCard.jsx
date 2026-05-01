import { useFavorites } from "../context/FavoritesContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import Toast from "./Toast";

function MovieCard({ movie }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [toast, setToast] = useState("");

  const fav = isFavorite(movie.imdbID);

  return (
    <Link to={`/movie/${movie.imdbID}`} className="card-link">
      <div className="card">
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450"
          }
          alt={movie.Title}
        />

        <div className="card-content">
          <h3>{movie.Title}</h3>
          <p>{movie.Year}</p>

          <button
            onClick={(e) => {
              e.preventDefault(); // 🔥 prevents navigation
              e.stopPropagation(); // 🔥 extra safety

              if (fav) {
                removeFavorite(movie.imdbID);
                setToast("Removed from favorites 💔");
              } else {
                addFavorite(movie);
                setToast("Added to favorites ❤️");
              }
            }}
          >
            {fav ? "Remove ❤️" : "Add ❤️"}
          </button>

          {toast && <Toast message={toast} onClose={() => setToast("")} />}
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
