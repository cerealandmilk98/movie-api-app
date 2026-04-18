import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../services/api";

import MovieHero from "../components/MovieHero";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getMovieDetails(id);

        if (!data || data.Response === "False") {
          setError(data?.Error || "Movie not found");
          setMovie(null);
          return;
        }

        setMovie(data);
      } catch {
        setError("Failed to load movie");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <p style={{ padding: "20px" }}>Loading...</p>;

  if (error)
    return (
      <div style={{ padding: "20px" }}>
        <Link to="/">← Back</Link>
        <p>{error}</p>
      </div>
    );

  return (
    <div className="movie-page">
      <Link to="/" className="back-btn">
        ← Back
      </Link>

      {movie && <MovieHero movie={movie} />}
    </div>
  );
}

export default MovieDetails;
