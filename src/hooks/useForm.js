import { useState } from "react";

export function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value, validationMessage } = e.target;

    setValues((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({ ...prev, [name]: validationMessage }));

    setIsValid(e.target.form.checkValidity());
  };

  return { values, handleChange, setValues, errors, isValid };
}
