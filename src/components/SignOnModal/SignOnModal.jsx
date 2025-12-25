import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState, useContext } from "react";
import { useForm } from "../../hooks/useForm";
import "./SignOnModal.css";

export default function SignOnModal({
  onClose,
  isOpen,
  onRegister,
  onLogin,
  mode,
  setMode,
}) {
  const { values, handleChange, setValues, errors, isValid } = useForm({
    username: "",
    email: "",
    password: "",
  });

  const isFormValid =
    isValid &&
    (mode === "register"
      ? values.username && values.email && values.password.length >= 3
      : values.email && values.password);

  useEffect(() => {
    if (isOpen) {
      setValues({
        username: "",
        email: "",
        password: "",
      });
    }
  }, [isOpen, mode, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === "register") {
      onRegister(values);
      return;
    }

    if (mode === "login") {
      onLogin(values);
      onClose();
    }
  };

  return (
    <ModalWithForm
      title={mode === "register" ? "Sign up" : "Sign in"}
      buttonText={mode === "register" ? "Sign Up" : "Sign in"}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      disabled={!isFormValid}
      switchLink={
        <p className="modal__switch-wrapper">
          <span className="modal__switch-or">or </span>
          <a
            href="#"
            className="modal__switch-link"
            type="button"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
          >
            {mode === "login" ? "Sign up →" : "Sign in →"}
          </a>
        </p>
      }
    >
      {mode === "register" && (
        <>
          <label className="modal__label">
            Email
            <input
              type="email"
              className="modal__input"
              name="email"
              placeholder="Enter your email"
              required
              value={values.email}
              onChange={handleChange}
            />
            <span className="modal__error">{errors.email}</span>
          </label>
          <label className="modal__label">
            Password
            <input
              type="password"
              className="modal__input"
              name="password"
              placeholder="Enter password"
              required
              minLength="3"
              maxLength="30"
              value={values.password}
              onChange={handleChange}
            />
            <span className="modal__error">{errors.password}</span>
          </label>
          <label className="modal__label">
            Username
            <input
              type="text"
              className="modal__input"
              name="username"
              placeholder="Enter your username"
              minLength="1"
              maxLength="30"
              required
              value={values.username}
              onChange={handleChange}
            />
            <span className="modal__error">{errors.username}</span>
          </label>
        </>
      )}

      {mode === "login" && (
        <>
          <label className="modal__label">
            Email
            <input
              type="email"
              className="modal__input"
              name="email"
              placeholder="Enter your email"
              required
              value={values.email}
              onChange={handleChange}
            />
          </label>
          <label className="modal__label">
            Password
            <input
              type="password"
              className="modal__input"
              name="password"
              placeholder="Enter password"
              required
              value={values.password}
              onChange={handleChange}
            />
          </label>
        </>
      )}
    </ModalWithForm>
  );
}
