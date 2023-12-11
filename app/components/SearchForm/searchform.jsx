import React from "react";
import "./searchform.css";
import { FIND_YOUR_MOVIE } from "../constants";
import { useState, useEffect } from "react";


const SearchForm = ({ searchQuery: initialQuery = '', onSearch }) => {

  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="form-container">
      <p className="header-element">{FIND_YOUR_MOVIE}</p>
      <input
        className="form-input"
        type="text"
        placeholder="What do you want to search?"
        value={searchQuery}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button className="form-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchForm;
