import React from "react";
import "./Preloader.css";
import noResultsIcon from "../../images/NotFound.png";

export default function Preloader({ status }) {
  if (status === "loading") {
    return (
      <div className="preloader">
        <div className="spinner"></div>
        <p>Searching for news...</p>
      </div>
    );
  }

  if (status === "empty") {
    return (
      <div className="preloader preloader__notfound">
        <img
          src={noResultsIcon}
          alt="No results found"
          className="preloader__icon"
        />
        <h2 className="preloader__title">Nothing found</h2>
        <p className="preloader__text">
          Sorry, but nothing matched your search terms.
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="preloader preloader__error">
        <img
          src={noResultsIcon}
          alt="Please try again later"
          className="preloader__icon"
        />
        <h2 className="preloader__title">
          Sorry, something went wrong during the request.
        </h2>
        <p className="preloader__text">Please try again later.</p>
      </div>
    );
  }

  return null;
}
