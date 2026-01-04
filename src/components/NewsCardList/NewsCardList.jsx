import React, { useState } from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";

function NewsCardList({
  articles,
  handleToggleBookmark,
  isArticlesaved = false,
  isLoggedIn,
}) {
  const [visibleCount, setVisibleCount] = useState(3);

  const showMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const visibleArticles = articles.slice(0, visibleCount);

  return (
    <section className="newsCardList">
      <h2 className="newsCardList__title">Search results</h2>
      <div className="newCardList__container">
        <div className="newsCardList__grid">
          {visibleArticles.map((article, index) => (
            <NewsCard
              key={index}
              article={article}
              index={index}
              handleToggleBookmark={handleToggleBookmark}
              isArticlesaved={isArticlesaved}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>
      </div>

      {visibleCount < articles.length && (
        <button onClick={showMore} className="newsCardList__showMore">
          Show more
        </button>
      )}
    </section>
  );
}

export default NewsCardList;
