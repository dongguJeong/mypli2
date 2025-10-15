// hooks/usePortal.ts
import { useEffect, useState } from "react";

export function usePortal(id: string) {
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let portalRoot = document.getElementById(id);

    if (!portalRoot) {
      portalRoot = document.createElement("div");
      portalRoot.id = id;
      document.body.appendChild(portalRoot);
    }

    setElement(portalRoot);

    return () => {
      if (portalRoot && portalRoot.childNodes.length === 0) {
        portalRoot.remove();
      }
    };
  }, [id]);

  return element;
}
