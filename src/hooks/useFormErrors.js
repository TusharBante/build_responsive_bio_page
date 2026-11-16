import { useState, useCallback } from 'react';

/**
 * Custom hook to manage form validation and error handling cleanly.
 * Provides helpers to set, clear, and inspect field-level and API errors.
 */
export function useFormErrors(initialErrors = {}) {
  const [errors, setErrors] = useState(initialErrors);

  // Set an error for a specific field
  const setFieldError = useCallback((field, message) => {
    setErrors((prev) => ({
      ...prev,
      [field]: message
    }));
  }, []);

  // Clear the error for a specific field when updated
  const clearFieldError = useCallback((field) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  }, []);

  // Clear all errors
  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  // Set errors received from backend/API response
  const setApiErrors = useCallback((apiErrors) => {
    if (Array.isArray(apiErrors)) {
      const formatted = {};
      apiErrors.forEach((err) => {
        if (err.field) {
          formatted[err.field] = err.message;
        }
      });
      setErrors(formatted);
    } else if (typeof apiErrors === 'object' && apiErrors !== null) {
      setErrors(apiErrors);
    }
  }, []);

  const hasErrors = Object.keys(errors).length > 0;

  return {
    errors,
    setErrors,
    setFieldError,
    clearFieldError,
    clearAllErrors,
    setApiErrors,
    hasErrors
  };
}

export default useFormErrors;
