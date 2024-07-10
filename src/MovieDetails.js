import React from "react";
import "./styles.css";

const MovieDetails = ({ movie, onBackClick }) => {
  return (
    <div className="movie-details">
      <button className="back-button" onClick={onBackClick}>Back</button>
      <img src={movie.image} alt={movie.name} className="movie-details-image" />
      <h2>{movie.name}</h2>
      <p>{movie.introduce}</p>
      <p>Duration: {movie.time} minutes</p>
      <p>Year: {movie.year}</p>
    </div>
  );
};

export default MovieDetails;
