import { useCallback, useMemo, useState } from "react";
import { validateTaskForm } from "../api/tasks.validators";

export const taskFormDefaults = {
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  completed: false,
};

export default function useTaskForm(initialForm = taskFormDefaults) {
  const [form, setForm] = useState({ ...taskFormDefaults, ...initialForm });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const handleChange = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const validate = useCallback(() => {
    const validationErrors = validateTaskForm(form);
    setErrors(validationErrors);
    return validationErrors;
  }, [form]);

  const submit = useCallback(
    async (submitFn) => {
      const validationErrors = validate();
      if (Object.keys(validationErrors).length > 0) {
        return { success: false, errors: validationErrors };
      }

      setSubmitting(true);
      const response = await submitFn?.(form);
      setSubmitting(false);

      if (response?.success) {
        setErrors({});
      } else if (response?.message) {
        setErrors((prev) => ({ ...prev, form: response.message }));
      }

      return response;
    },
    [form, validate]
  );

  const reset = useCallback(
    (nextForm = taskFormDefaults) => {
      setForm({ ...taskFormDefaults, ...nextForm });
      setErrors({});
    },
    []
  );

  return {
    form,
    errors,
    submitting,
    isValid,
    handleChange,
    validate,
    submit,
    reset,
    setForm,
    setSubmitting,
    setErrors,
  };
}
