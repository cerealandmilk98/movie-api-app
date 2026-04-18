function MovieSkeleton() {
  return (
    <div style={{ padding: "20px" }}>
      <div style={{ height: "20px", background: "#222", width: "200px" }} />
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={{ width: "300px", height: "450px", background: "#222" }} />
        <div style={{ flex: 1 }}>
          <div
            style={{ height: "20px", background: "#222", marginBottom: "10px" }}
          />
          <div style={{ height: "100px", background: "#222" }} />
        </div>
      </div>
    </div>
  );
}

export default MovieSkeleton;
