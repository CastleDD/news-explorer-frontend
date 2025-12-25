import React from "react";
// import "./SuccessModal.css";
import whiteX from "../../images/close.png";

export default function SuccessModal({ isOpen, onClose, onSignin }) {
  if (!isOpen) return null;

  return (
    <div className={`modal  ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">Registration successfully completed!</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={whiteX} alt="exit" />
        </button>
        <button type="button" className="modal__submit" onClick={onSignin}>
          Sign in
        </button>
      </div>
    </div>
  );
}
