import { useCallback, useMemo, useState } from "react";
import { validateAuthForm } from "../api/auth.validators";

export default function useAuthForm(initialValues) {
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [dirty, setDirty] = useState(false);

  const validate = useCallback(
    (values) => {
      const validationErrors = validateAuthForm(values);
      setErrors(validationErrors);
      return validationErrors;
    },
    [setErrors]
  );

  const setField = useCallback((field, value) => {
    setDirty(true);
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      validate(updated);
      return updated;
    });
  }, [validate]);

  const handleSubmit = useCallback(
    (callback) => (event) => {
      event?.preventDefault();
      setDirty(true);
      const validationErrors = validate(form);
      const hasErrors = Object.values(validationErrors).some(Boolean);
      if (!hasErrors && typeof callback === "function") {
        callback(form);
      }
    },
    [form, validate]
  );

  const reset = useCallback(() => {
    setForm(initialValues);
    setErrors({});
    setDirty(false);
  }, [initialValues]);

  const isValid = useMemo(
    () => !Object.values(errors).some(Boolean),
    [errors]
  );

  return {
    form,
    errors,
    dirty,
    isValid,
    setField,
    handleSubmit,
    reset,
  };
}
