import { useEffect } from "react";
import "./ModalWithForm.css";
import whiteX from "../../images/close.png";

function ModalWithForm({
  children,
  buttonText,
  title,
  name,
  onClose,
  isOpen,
  onSubmit,
  disabled,
  switchLink,
}) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`modal  ${isOpen ? "modal_opened" : ""}`}
      onMouseDown={handleOverlayClick}
    >
      <div className="modal__content" onMouseDown={(e) => e.stopPropagation()}>
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={whiteX} alt="exit" />
        </button>
        <form
          onSubmit={onSubmit}
          className="modal__form"
          name={name}
          noValidate
        >
          {children}

          <button
            type="submit"
            disabled={disabled}
            className={`modal__submit ${
              disabled ? "modal__submit_disabled" : ""
            }`}
          >
            {buttonText}
          </button>
          {switchLink && switchLink}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
