import React, { Component } from "react";
import Dialog from "../Dialog/Dialog";
import "./movieForm.css";

class MovieForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: props.initialMovieInfo || {
        title: "",
        release_date: "",
        poster_path: "",
        vote_average: 0,
        genres: [],
        runtime: 0,
        tagline: "",
        overview: "",
      },
      formType: props.formType || "",
    };
  }

  handleInputChange = (e) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.props.onSubmit) {
      console.log('form type ' + this.state.formType)
      if (this.state.formType !== 'edit') {
        const genresArray = this.state.formData.genres.split(',').map(genre => genre.trim());
        this.state.formData.genres = genresArray;
      }
      this.props.onSubmit(this.state.formData);
    }
  };

  render() {
    return (
      <div>
        <Dialog
          title="Add/Edit Movie"
          onClose={this.props.onClose}
          portalNode={this.props.portalNode}
        >
          <form className="movie-form" onSubmit={this.handleSubmit}>
            <label>
              Title
              <input
                type="text"
                name="title"
                value={this.state.formData.title}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              Movie Url
              <input
                type="text"
                name="poster_path"
                value={this.state.formData.poster_path}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              Genre
              <input
                type="text"
                name="genres"
                value={this.state.formData.genres}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              Rating
              <input
                type="number"
                name="vote_average"
                value={this.state.formData.vote_average}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              Runtime
              <input
                type="number"
                name="runtime"
                value={this.state.formData.runtime}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              Release Date
              <input
                type="text"
                name="release_date"
                value={this.state.formData.release_date}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              Tagline
              <input
                type="text"
                name="tagline"
                value={this.state.formData.tagline}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              Overview
              <input
                className="wider-input"
                type="text"
                name="overview"
                value={this.state.formData.overview}
                onChange={this.handleInputChange}
              />
            </label>
            <button className="form-button" type="reset">
              Reset
            </button>
            <button className="form-button" type="submit">
              Submit
            </button>
          </form>
        </Dialog>
      </div>
    );
  }
}

export default MovieForm;

