function MovieMeta({ movie }) {
  return (
    <div className="meta">
      <span>{movie.Year}</span>
      <span>•</span>
      <span>{movie.Runtime}</span>
      <span>•</span>
      <span className="rating">⭐ {movie.imdbRating}</span>
    </div>
  );
}

export default MovieMeta;
