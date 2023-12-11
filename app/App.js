import React from 'react';
import SearchForm from "./components/SearchForm/searchform";
import "./index.css";
import "./components/Header/header.css";
import MoviesList from "./components/Movies/MovieList/MovieList";
import SortAndGenreControl from "./components/SortAndGenreControl/SortAndGenreControl";
import AddMovie from "./components/Movies/AddMovie/AddMovie";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGenre: 'All',
      currentSort: "release_date",
      searchString: "",
    };
  }

  handleSearch = (query) => {
    this.setState({ searchString: query });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre });

  };

  handleSortChange = (sortOption) => {
    this.setState({ currentSort: sortOption });
  };

  render() {
    const { selectedGenre, currentSort, searchString } =
      this.state;
    return (
      <div className="div-container">
        <AddMovie />
        <SearchForm onSearch={this.handleSearch} />
        <SortAndGenreControl
          genres={["All", "Action", "Comedy", "Horror", "Crime"]}
          selectedGenre={selectedGenre}
          onSelect={this.handleGenreSelect}
          currentSort={currentSort}
          onSortChange={this.handleSortChange}
        />
        <MoviesList
          selectedGenre={selectedGenre}
          currentSort={currentSort}
          searchString={searchString} />
      </div>
    );
  }
}

export default App;