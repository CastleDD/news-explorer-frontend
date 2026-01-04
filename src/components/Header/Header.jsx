import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import logoutSaved from "../../images/logout.png";
import logoutHome from "../../images/logout-white.png";
import menuHome from "../../images/menuYt.svg";
import menuSaved from "../../images/menuBlk.svg";

function Header({
  isHome,
  isLoggedIn,
  currentUser,
  onSignUpClick,
  onLoginClick,
  onLogoutClick,
  onOpenMenu,
  onCloseMenu,
  isMenuOpen,
}) {
  const location = useLocation();
  const userName = currentUser?.username || "";

  const isSaved = location.pathname === "/saved-news";
  const icon = isHome ? logoutHome : logoutSaved;
  const menu = isHome ? menuHome : menuSaved;

  return (
    <header className={`header ${isHome ? "header__home" : "header__default"}`}>
      <h1 className="header__title">NewsExplorer</h1>

      <nav className="header__nav">
        <Link
          to="/"
          className={`header__link ${
            location.pathname === "/" ? "header__link_active" : ""
          }`}
        >
          Home
        </Link>

        {isLoggedIn ? (
          <>
            <Link
              to="/saved-news"
              className={`header__link ${isSaved ? "header__link_active" : ""}`}
            >
              Saved Articles
            </Link>

            <button
              className="header__user-button"
              onClick={onLogoutClick}
              type="button"
            >
              <span className="header__username">{userName}</span>
              <img src={icon} alt="log out" className="header__logout-icon" />
            </button>
          </>
        ) : (
          <button className="header__signup" onClick={onLoginClick}>
            Sign In
          </button>
        )}
        <button
          className="header__menu-btn"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={isMenuOpen ? onCloseMenu : onOpenMenu}
          type="button"
        >
          {isMenuOpen ? (
            <span className="Header__menu-close">×</span>
          ) : (
            <img src={menu} alt="Menu" className="header__menu" />
          )}
        </button>
      </nav>
    </header>
  );
}

export default Header;
