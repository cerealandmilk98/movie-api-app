import MovieMeta from "./MovieMeta";
import GenreChips from "./GenreChips";

function MovieHero({ movie }) {
  const genres = movie.Genre ? movie.Genre.split(",") : [];

  return (
    <div className="hero">
      <img
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/300"
        }
        alt={movie.Title}
        className="poster"
      />

      <div className="info">
        <h1>{movie.Title}</h1>

        <MovieMeta movie={movie} />

        <GenreChips genres={genres} />

        <p className="plot">{movie.Plot}</p>

        <div className="details">
          <p>
            <strong>Director:</strong> {movie.Director}
          </p>
          <p>
            <strong>Actors:</strong> {movie.Actors}
          </p>
          <p>
            <strong>Language:</strong> {movie.Language}
          </p>
          <p>
            <strong>Country:</strong> {movie.Country}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MovieHero;
