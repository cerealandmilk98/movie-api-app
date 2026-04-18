function GenreChips({ genres }) {
  return (
    <div className="genres">
      {genres.map((g, i) => (
        <span key={i} className="chip">
          {g.trim()}
        </span>
      ))}
    </div>
  );
}

export default GenreChips;
