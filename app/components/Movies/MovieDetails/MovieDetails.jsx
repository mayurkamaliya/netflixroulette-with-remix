import React, { Component } from "react";
import PropTypes from "prop-types";
import "./movieDetails.css";

class MovieDetails extends Component {
  render() {
    const { poster_path, name, release_date, vote_average, runtime, overview } =
      this.props.movieInfo;
    return (
      <div className="movie-details">
        <div className="movie-poster">
          <img src={poster_path} alt={name} />
        </div>
        <div className="movie-info">
          <h2>{name}</h2>
          <p>Release Year: {release_date}</p>
          <p>Rating: {vote_average}</p>
          <p>Duration: {runtime}</p>
          <p>{overview}</p>
        </div>
      </div>
    );
  }
}

MovieDetails.propTypes = {
  movieInfo: PropTypes.shape({
    pictureURL: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    runtime: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieDetails;
