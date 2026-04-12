import { useState, useEffect } from "react";

function MovieCard({ movie }) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFav(favs.some((m) => m.imdbID === movie.imdbID));
  }, [movie.imdbID]);

  const toggleFavorite = () => {
    let favs = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFav) {
      favs = favs.filter((m) => m.imdbID !== movie.imdbID);
    } else {
      favs.push(movie);
    }

    localStorage.setItem("favorites", JSON.stringify(favs));
    setIsFav(!isFav);

    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  return (
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

        <button onClick={toggleFavorite}>
          {isFav ? "Remove ❤️" : "Add ❤️"}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
