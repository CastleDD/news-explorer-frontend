// Fake in-memory database
let savedArticles = [];

// Simulate getting saved articles
export function getItems() {
  return new Promise((resolve) => {
    resolve(savedArticles);
  });
}

// Simulate saving an article
export function saveArticle(article) {
  const savedArticle = {
    ...article,
    _id: crypto.randomUUID(),
  };

  savedArticles.push(savedArticle);

  return new Promise((resolve) => {
    resolve(savedArticle);
  });
}

// Simulate removing an article
export function removeArticle(id) {
  savedArticles = savedArticles.filter((item) => item._id !== id);

  return new Promise((resolve) => {
    resolve({ message: "Article removed" });
  });
}
