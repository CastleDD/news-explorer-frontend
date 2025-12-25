import React from "react";
import Header from "../Header/Header";
import "./SavedNews.css";
import NewsCard from "../NewsCard/NewsCard";
import NewsCardList from "../NewsCardList/NewsCardList";

function SavedNews({ currentUser, savedArticles, handleToggleBookmark }) {
  const userName = currentUser?.username || currentUser?.name || "";

  const keywords = [
    ...new Set(
      savedArticles.map((a) =>
        a.keyword
          ? a.keyword
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")
          : ""
      )
    ),
  ];

  return (
    <section className="savedNews">
      <div className="savedNews__container">
        <p className="savedNews__subtitle">Saved articles</p>
        <h2 className="savedNews__title">
          {userName}, you have {savedArticles.length} saved articles
        </h2>
        <h3 className="savedNews__keyword">
          By keywords:{" "}
          {keywords.map((keyword, index) => (
            <span key={keyword}>
              <strong>{keyword}</strong>
              {index < keywords.length - 1 && ", "}
            </span>
          ))}
        </h3>
      </div>

      <div className="savedNews__section">
        <div className="newsCardList__grid">
          {savedArticles.map((article, i) => (
            <NewsCard
              key={i}
              article={article}
              handleToggleBookmark={handleToggleBookmark}
              isArticleSaved={true}
              isLoggedIn={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SavedNews;
