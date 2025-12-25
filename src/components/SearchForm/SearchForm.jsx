import React, { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!keyword.trim()) {
      setError("Please enter a keyword");
      return;
    }
    setError("");
    onSearch(keyword);
  };

  return (
    <form className="search__form" onSubmit={handleSubmit}>
      <div className="search__field">
        <input
          className="search__input"
          type="text"
          placeholder="Enter keyword"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            setError("");
          }}
        />
      </div>
      {error && <span className="search__error">{error}</span>}
      <button className="search__button" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchForm;
