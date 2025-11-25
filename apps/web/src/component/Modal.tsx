import type React from "react";
import { useModalStore } from "../store/modal-store";

interface IModal {
  children: React.ReactNode;
}

export default function Modal({ children }: IModal) {
  const { close } = useModalStore();

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen z-999 flex justify-center items-center bg-black/80"
      onClick={close}
    >
      {children}
    </div>
  );
}
