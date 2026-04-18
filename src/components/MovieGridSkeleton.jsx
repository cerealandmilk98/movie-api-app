function MovieGridSkeleton() {
  const placeholders = Array.from({ length: 10 });

  return (
    <div className="grid">
      {placeholders.map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-img"></div>
          <div className="skeleton-line short"></div>
          <div className="skeleton-line"></div>
        </div>
      ))}
    </div>
  );
}

export default MovieGridSkeleton;
