import React, { useState } from "react";
import "./NewsCard.css";

import bookmarkIcon from "../../images/Group 12.svg"; // clicked / saved
import unbookmarkIcon from "../../images/Group 13.svg"; // default
import bookmarkHover from "../../images/Group 14.svg"; // hover

import trashIcon from "../../images/Trashwhite.png";
import trashIconBlack from "../../images/TrashBlack.png";

function NewsCard({
  article,
  handleToggleBookmark,
  isArticleSaved,
  isLoggedIn,
}) {
  // 🔹 UI-only state for HOME page bookmark behavior
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // 🔹 Decide icon
  const icon = isArticleSaved
    ? isHovered
      ? trashIconBlack
      : trashIcon
    : isBookmarked
    ? bookmarkIcon
    : isHovered
    ? bookmarkHover
    : unbookmarkIcon;

  const formatDate = new Date(article.publishedAt).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const capFirstLetter = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  return (
    <div
      className="newsCard"
      role="button"
      tabIndex={0}
      onClick={() => window.open(article.url, "_blank")}
      onKeyDown={(e) => {
        if (e.key === "Enter") window.open(article.url, "_blank");
      }}
    >
      {isArticleSaved && article.keyword && (
        <span className="newsCard__keyword">
          {capFirstLetter(article.keyword)}
        </span>
      )}

      <img
        src={article.urlToImage}
        alt={article.title}
        className="newsCard__image"
      />

      <div className="newsCard__action">
        <button
          className="newsCard__bookmark"
          type="button"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={(e) => {
            e.stopPropagation();
            if (!isLoggedIn) return;

            setIsBookmarked((prev) => !prev);

            if (handleToggleBookmark) {
              handleToggleBookmark(article);
            }
          }}
        >
          <img src={icon} alt="bookmark or trash" />

          <span className="newsCard__tip">
            {isArticleSaved
              ? "Remove from saved"
              : !isLoggedIn
              ? "Sign in to save articles"
              : isBookmarked
              ? "Remove bookmark"
              : "Save article"}
          </span>
        </button>
      </div>

      <div className="newsCard__content">
        <p className="newsCard__date">{formatDate}</p>
        <h3 className="newsCard__title">{article.title}</h3>
        <p className="newsCard__description">{article.description}</p>
        <h2 className="newsCard__source">{article.source.name}</h2>
      </div>
    </div>
  );
}

export default NewsCard;
