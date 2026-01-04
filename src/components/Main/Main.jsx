import React from "react";
import Header from "../../components/Header/Header";
import "./Main.css";
import SearchForm from "../SearchForm/SearchForm";

function Main({ onSearch }) {
  return (
    <main className="main">
      <div className="main__content">
        <h2 className="main__header">What's going on in the world?</h2>
        <p className="main__header-info">
          Find the latest news on any topic and save them in your personal
          account.
        </p>

        <SearchForm onSearch={onSearch} />
      </div>
    </main>
  );
}

export default Main;
