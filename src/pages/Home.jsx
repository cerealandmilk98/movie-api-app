import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import { searchMovies } from "../services/api";
import MovieGridSkeleton from "../components/MovieGridSkeleton";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get("query") || "batman"; // 🔥 default trending
  const initialPage = Number(searchParams.get("page")) || 1;

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(initialPage);
  const [totalResults, setTotalResults] = useState(0);

  const requestIdRef = useRef(0);

  const fetchMovies = async (query, pageNum) => {
    const requestId = ++requestIdRef.current;

    setLoading(true);
    setError("");

    try {
      const data = await searchMovies(query, pageNum);

      if (requestId !== requestIdRef.current) return;

      if (data.Response === "False") {
        setMovies([]);
        setTotalResults(0);
        setError(data.Error || "No results");
      } else {
        setMovies(data.Search || []);
        setTotalResults(Number(data.totalResults));
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
      setMovies([]);
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  };

  const handleSearch = (query) => {
    if (!query || query.trim().length < 2) return;

    setPage(1);
    setSearchParams({ query, page: 1 });
  };

  // 🔥 sync URL → fetch
  useEffect(() => {
    fetchMovies(initialQuery, page);
  }, [initialQuery, page]);

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div>
      <SearchBar onSearch={handleSearch} initialQuery={initialQuery} />

      <h2 style={{ marginTop: "10px" }}>Results for "{initialQuery}"</h2>

      {loading ? (
        <MovieGridSkeleton />
      ) : error ? (
        <p className="empty">{error}</p>
      ) : (
        <>
          <div className="grid">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>

          {/* 🔥 PAGINATION */}
          {totalPages > 1 && (
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <button
                onClick={() => {
                  const newPage = page - 1;
                  setPage(newPage);
                  setSearchParams({ query: initialQuery, page: newPage });
                }}
                disabled={page === 1}
              >
                Prev
              </button>

              <span style={{ margin: "0 10px" }}>
                Page {page} of {totalPages}
              </span>

              <button
                onClick={() => {
                  const newPage = page + 1;
                  setPage(newPage);
                  setSearchParams({ query: initialQuery, page: newPage });
                }}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
