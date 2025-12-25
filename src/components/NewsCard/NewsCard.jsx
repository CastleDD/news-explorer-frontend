import React, { useState } from "react";
import "./NewsCard.css";
import bookmarkIcon from "../../images/bookmark.png";
import unbookmarkIcon from "../../images/Unbookmark.png";
import trashIcon from "../../images/Trashwhite.png";
import trashIconblack from "../../images/TrashBlack.png";

function NewsCard({
  article,
  handleToggleBookmark,
  isArticleSaved,
  isLoggedIn,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const icon = isArticleSaved
    ? isHovered
      ? trashIconblack
      : trashIcon
    : article.saved
    ? bookmarkIcon
    : unbookmarkIcon;

  const formatDate = new Date(article.publishedAt).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const capFirstLetter = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="newsCard">
      <a
        className="newsCard__link"
        href={article.url}
        target="_blank"
        rel="noreferrer"
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
            onMouseEnter={() => isArticleSaved && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={(e) => {
              e.preventDefault();
              if (!isLoggedIn) return;

              handleToggleBookmark(article);
            }}
          >
            <img src={icon} alt="bookmark or trash" />

            <span className="newsCard__tip">
              {isArticleSaved
                ? "Remove from saved"
                : !isLoggedIn
                ? "Sign in to save articles"
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
      </a>
    </div>
  );
}

export default NewsCard;
