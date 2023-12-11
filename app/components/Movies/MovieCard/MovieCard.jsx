import React, { Component } from "react";
import PropTypes from "prop-types";
import MovieImage from "../MovieImage/MovieImage";
import MovieInfo from "../MovieInfo/MovieInfo";

class MovieCard extends Component {
  render() {
    return (
      <>
        <div className="image-container">
          <MovieImage
            toggleShowFilmBody={this.props.toggleShowFilmBody}
            img={this.props.pictureURL}
            filmTitle={this.props.name}
            film={this.props.film}
          />
        </div>
        <MovieInfo
          description={this.props.tagline}
          name={this.props.name}
          year={this.props.year}
        />
      </>
    );
  }
}
MovieCard.propTypes = {
  genres: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  year: PropTypes.string.isRequired,
  pictureURL: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  film: PropTypes.object.isRequired,
};
export default MovieCard;
