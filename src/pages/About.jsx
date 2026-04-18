function About() {
  return (
    <div style={{ padding: "20px", lineHeight: "1.6" }}>
      <h2>About This Project 🎬</h2>

      <p>
        Movie Finder is a React application built using the OMDb API. It allows
        users to search for movies, view details, and save favorites locally.
      </p>

      <h3>Features</h3>
      <ul style={{ marginTop: "10px", color: "#bbb" }}>
        <li>Movie search with real-time API data</li>
        <li>Detailed movie information page</li>
        <li>Favorites stored in localStorage</li>
        <li>Responsive UI with modern hover interactions</li>
      </ul>

      <h3>Tech Stack</h3>
      <ul style={{ marginTop: "10px", color: "#bbb" }}>
        <li>React (Hooks + Router)</li>
        <li>OMDb API</li>
        <li>CSS Grid + custom styling</li>
      </ul>

      <p style={{ marginTop: "20px", color: "#888" }}>
        This project was built as part of a frontend development portfolio to
        demonstrate real-world React skills.
      </p>
    </div>
  );
}

export default About;
