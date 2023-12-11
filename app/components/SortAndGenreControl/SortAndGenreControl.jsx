import React from "react";
import PropTypes from "prop-types";
import SortControl from "./SortControl";
import GenreSelect from "./GenreSelect";
import "./sortAndGenreControl.css";

class SortAndGenreControl extends React.Component {
  render() {
    const { genres, selectedGenre, onSelect, currentSort, onSortChange } =
      this.props;

    return (
      <div className="sort-and-genre-container">
        <GenreSelect
          genres={genres}
          selectedGenre={selectedGenre}
          onSelect={onSelect}
        />
        <SortControl
          currentSelection={currentSort}
          onSortChange={onSortChange}
          className="sortControl"
        />
      </div>
    );
  }
}

SortAndGenreControl.propTypes = {
  genres: PropTypes.array.isRequired,
  selectedGenre: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  currentSort: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

export default SortAndGenreControl;
