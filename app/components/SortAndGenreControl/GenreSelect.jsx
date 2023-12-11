import React from "react";
import "./genreselect.css";

class GenreSelect extends React.Component {
  render() {
    const { genres, selectedGenre, onSelect } = this.props;

    const genreButtons = genres.map((genre) => {
      const buttonClass = `genre-button ${
        genre === selectedGenre ? "red" : "white"
      }`;
      return (
        <button
          key={genre}
          className={buttonClass}
          onClick={() => onSelect(genre)}
        >
          {genre}
        </button>
      );
    });

    return <div className="genre-container">{genreButtons}</div>;
  }
}

export default GenreSelect;
