import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./MobileMenu.css";

function MobileMenu({
  isOpen,
  onClose,
  isLoggedIn,
  onSignInClick,
  currentUser,
  onLogoutClick,
}) {
  const location = useLocation();

  if (!isOpen) return null;

  return (
    <div className="menu">
      <div className="menu__overlay" onClick={onClose} />

      <div className="menu__container">
        <div className="menu__header">
          <span className="menu__title">NewsExplorer</span>
          <button className="menu__close" onClick={onClose}>
            ×
          </button>
        </div>

        <nav className="menu__nav">
          {/* Home */}
          <Link
            to="/"
            className={`menu__link ${
              location.pathname === "/" ? "menu__link_active" : ""
            }`}
            onClick={onClose}
          >
            Home
          </Link>

          {/* Saved Articles */}
          {isLoggedIn && (
            <Link
              to="/saved-news"
              className={`menu__link ${
                location.pathname === "/saved-news" ? "menu__link_active" : ""
              }`}
              onClick={onClose}
            >
              Saved Articles
            </Link>
          )}

          {/* Auth button */}
          {!isLoggedIn ? (
            <button className="menu__signin" onClick={onSignInClick}>
              Sign in
            </button>
          ) : (
            <button className="menu__signin" onClick={onLogoutClick}>
              {currentUser?.username}
            </button>
          )}
        </nav>
      </div>
    </div>
  );
}

export default MobileMenu;
