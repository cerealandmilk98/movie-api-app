import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import { searchMovies } from "../services/api";
import MovieGridSkeleton from "../components/MovieGridSkeleton";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get("query") || "";

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    setLoading(true);

    // store query in URL
    setSearchParams({ query });

    const data = await searchMovies(query);
    setMovies(data.Search || []);

    setLoading(false);
  };

  // 🔥 auto-run search if URL already has query
  useEffect(() => {
    if (!initialQuery) return;

    const fetchFromUrl = async () => {
      setLoading(true);
      const data = await searchMovies(initialQuery);
      setMovies(data.Search || []);
      setLoading(false);
    };

    fetchFromUrl();
  }, [initialQuery]);

  return (
    <div>
      <SearchBar onSearch={handleSearch} />

      {loading && <MovieGridSkeleton />}

      <div className="grid">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Home;
