import React, { useState } from "react";
import "./styles.css";
import { movies } from "./movies";
import MovieDetails from "./MovieDetails";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [sortOption, setSortOption] = useState("random");


  const sortedMoviesByYear = [...movies].sort((a, b) => b.year - a.year);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleBackClick = () => {
    setSelectedMovie(null);
  };


  const filteredMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  let selectedMovies;
  switch (sortOption) {
    case "year":
      selectedMovies = sortedMoviesByYear;
      break;
    case "random":
    default:
      selectedMovies = filteredMovies;
      break;
  }

  return (
    <div className="app">
      <div className="header">
        <h1>MOVIE UI</h1>
        <input
          type="text"
          placeholder="Search Movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={selectedMovie !== null}
        />
        <select value={sortOption} onChange={handleSortChange}>
          <option value="random">Random Order</option>
          <option value="year">Sort by Year</option>
        </select>
      </div>
      {selectedMovie ? (
        <MovieDetails movie={selectedMovie} onBackClick={handleBackClick} />
      ) : (
        <div className="movie-list">
          {selectedMovies.length > 0 ? (
            selectedMovies.map((movie) => (
              <MovieCard key={movie.ID} movie={movie} onClick={handleMovieClick} />
            ))
          ) : (
            <p>No movies found.</p>
          )}
        </div>
      )}
    </div>
  );
};

const MovieCard = ({ movie, onClick }) => {
  return (
    <div className="movie-card" onClick={() => onClick(movie)}>
      <img src={movie.image} alt={movie.name} />
      <div className="movie-info">
        <h3>{movie.name}</h3>
        <p>{movie.time} minutes | {movie.year}</p>
        <p>{movie.introduce}</p>
      </div>
    </div>
  );
};

export default App;
