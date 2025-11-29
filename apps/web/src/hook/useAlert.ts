import { useCallback } from "react";

export function useAlert() {
  const showAlert = useCallback((message: string) => {
    alert(message);
  }, []);

  const showConfirm = useCallback((message: string, onConfirm: () => void) => {
    if (window.confirm(message)) {
      onConfirm();
    }
  }, []);

  return {
    showAlert,
    showConfirm,
  };
}
