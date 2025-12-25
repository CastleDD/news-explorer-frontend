const checkResponse = (res) =>
  res.ok
    ? res.json()
    : res.json().then((err) => Promise.reject(err.message || "Error"));

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
console.log("API KEY:", API_KEY);

const getDates = () => {
  const today = new Date();
  const sevenDaysAgo = new Date();

  sevenDaysAgo.setDate(today.getDate() - 7);

  return {
    from: sevenDaysAgo.toISOString().split("T")[0],
    to: today.toISOString().split("T")[0],
  };
};

export const getNews = (keyword) => {
  const { from, to } = getDates();

  const url = new URL(BASE_URL);
  url.searchParams.set("q", keyword);
  url.searchParams.set("from", from);
  url.searchParams.set("to", to);
  url.searchParams.set("pageSize", 100);

  // Only add API_KEY in development
  if (process.env.NODE_ENV !== "production") {
    url.searchParams.set("apiKey", API_KEY);
  }

  return fetch(url)
    .then(checkResponse)
    .then((data) => data.articles);
};

// export const getNews = (keyword) => {
//   const { from, to } = getDates();

//   return fetch(
//     `${BASE_URL}?` +
//       `q=${encodeURIComponent(keyword)}` +
//       `&from=${from}` +
//       `&to=${to}` +
//       `&pageSize=100` +
//       `&apiKey=${API_KEY}`
//   )
//     .then(checkResponse)
//     .then((data) => data.articles);
// };
