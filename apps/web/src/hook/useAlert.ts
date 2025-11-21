import { useCallback } from "react";

export function useAlert() {
  const showAlert = useCallback((message: string) => {
    alert(message);
  }, []);

  return {
    showAlert,
  };
}
