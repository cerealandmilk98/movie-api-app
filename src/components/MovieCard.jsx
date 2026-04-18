import { useFavorites } from "../context/FavoritesContext";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const fav = isFavorite(movie.imdbID);

  return (
    <div className="card">
      <Link to={`/movie/${movie.imdbID}`}>
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450"
          }
          alt={movie.Title}
        />
      </Link>

      <div className="card-content">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>

        <button
          onClick={() =>
            fav ? removeFavorite(movie.imdbID) : addFavorite(movie)
          }
        >
          {fav ? "Remove ❤️" : "Add ❤️"}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
