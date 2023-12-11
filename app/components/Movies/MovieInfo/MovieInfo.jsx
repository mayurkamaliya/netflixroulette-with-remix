import React, { Component } from "react";
import PropTypes from "prop-types";
import "./movieInfo.css";

class MovieInfo extends Component {
  render() {
    const { name, year, description } = this.props;

    return (
      <div className="movieInfo">
        <div className="row">
          <h4>{name}</h4>
          <button>{year}</button>
        </div>
        <p>{description}</p>
      </div>
    );
  }
}

MovieInfo.propTypes = {
  name: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default MovieInfo;
