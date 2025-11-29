import type React from "react";
import { useModalStore } from "../store/modal-store";

interface IModal {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Modal({ children, onClick }: IModal) {
  const { close } = useModalStore();

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen z-999 flex justify-center items-center bg-black/80"
      onClick={onClick || close}
    >
      <div className="bg-[#212121]">{children}</div>
    </div>
  );
}
