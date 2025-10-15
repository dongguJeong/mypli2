import React from "react";
import { IoCloseOutline } from "react-icons/io5";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export function Modal({ isOpen, onClose, children, title }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="z-100 fixed top-0 left-0 w-screen h-screen">
      <div
        className="w-full h-full  bg-black/50 flex items-center justify-center"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-xl p-4 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <header className="flex-between text-black ">
            {title ? (
              <span className="text-xl font-medium">{title}</span>
            ) : (
              <div className="bg-white w-1 h-1" />
            )}

            <button
              className="hover:bg-gray rounded-full p-1 hover:text-black "
              onClick={onClose}
            >
              <IoCloseOutline className="w-7 h-7" />
            </button>
          </header>

          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
