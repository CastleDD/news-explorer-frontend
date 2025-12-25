import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import About from "../About/About";
import Footer from "../Footer/Footer";

import SuccessModal from "../SuccessModal/SuccessModal";
import SearchForm from "../SearchForm/SearchForm";
import NewsCardList from "../NewsCardList/NewsCardList";
import Preloader from "../Preloader/Preloader";

import { getNews } from "../../Utils/NewsApi";
import SavedNews from "../SavedNews/SavedNews";
import "./App.css";
import SignOnModal from "../SignOnModal/SignOnModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import MobileMenu from "../MobileMenu/MobileMenu";

function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (location.pathname !== "/") {
      setArticles([]);
      setHasSearched(false);

      setError("");
    }
  }, [location.pathname]);

  const handleSearch = (keyword) => {
    setHasSearched(true);
    setIsLoading(true);
    setError("");

    getNews(keyword)
      .then((data) => {
        setArticles(
          data.map((article) => ({
            ...article,
            saved: false,
            keyword,
          }))
        );
      })
      .catch(() => {
        setError(
          "Sorry, something went wrong during the request. Please try again later."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const searchStatus = !hasSearched
    ? "initial"
    : isLoading
    ? "loading"
    : error
    ? "error"
    : articles.length === 0
    ? "empty"
    : "success";

  const handleToggleBookmark = (article) => {
    setArticles((prev) =>
      prev.map((a) => (a.url === article.url ? { ...a, saved: !a.saved } : a))
    );

    setSavedArticles((prev) =>
      article.saved
        ? prev.filter((a) => a.url !== article.url)
        : [...prev, { ...article, saved: true }]
    );
  };

  const [signOnMode, setSignOnMode] = useState("login");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const openSignIn = () => {
    setIsMobileMenuOpen(false);

    setSignOnMode("login");
    setIsModalOpen(true);
  };

  const openRegister = () => {
    setIsMobileMenuOpen(false);
    setSignOnMode("register");
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleRegister = (data) => {
    console.log("REGISTER", data);
    localStorage.setItem("demoUser", JSON.stringify(data));
    setIsModalOpen(false);
    setIsSuccessOpen(true);
  };

  const handleLogin = (data) => {
    console.log("LOGIN", data);
    const stored = localStorage.getItem("demoUser");
    if (!stored) return;

    setCurrentUser(JSON.parse(stored));
    setIsLoggedIn(true);
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const openMobileMenu = () => setIsMobileMenuOpen(true);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="app">
      <div className="app__content">
        <Header
          isHome={isHome}
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          onSignupClick={openRegister}
          onLoginClick={openSignIn}
          onLogoutClick={handleLogout}
          onOpenMenu={openMobileMenu}
          onCloseMenu={() => {
            setIsMobileMenuOpen(false);
            setIsModalOpen(false);
          }}
          isMenuOpen={isMobileMenuOpen || isModalOpen}
        />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Main onSearch={handleSearch} />

                {searchStatus === "error" && <Preloader status="error" />}

                {searchStatus === "loading" && <Preloader status="loading" />}

                {searchStatus === "empty" && <Preloader status="empty" />}
                {searchStatus === "success" && (
                  <NewsCardList
                    articles={articles}
                    handleToggleBookmark={handleToggleBookmark}
                    isLoggedIn={isLoggedIn}
                  />
                )}

                <About />
              </>
            }
          />
          <Route
            path="/saved-news"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SavedNews
                  currentUser={currentUser}
                  savedArticles={savedArticles}
                  handleToggleBookmark={handleToggleBookmark}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={closeMobileMenu}
          isLoggedIn={isLoggedIn}
          onSignInClick={openSignIn}
          onLogoutClick={handleLogout}
          currentUser={currentUser}
        />

        <SignOnModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onRegister={handleRegister}
          onLogin={handleLogin}
          mode={signOnMode}
          setMode={setSignOnMode}
        />
        <SuccessModal
          isOpen={isSuccessOpen}
          onClose={() => setIsSuccessOpen(false)}
          onSignin={() => {
            setIsSuccessOpen(false);
            openSignIn();
          }}
        />
        <Footer />
      </div>
    </div>
  );
}

export default App;
