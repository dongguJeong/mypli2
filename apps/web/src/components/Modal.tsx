import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useModalStore, type ModalType } from "../store/modal-store";

export interface IModal {
  children: React.ReactNode;
  type: ModalType;
  title?: string;
}

export function Modal({ type, children, title }: IModal) {
  const { currentModal, closeModal } = useModalStore();
  if (currentModal !== type) return null;

  return (
    <div className="z-999 fixed top-0 left-0 w-screen h-screen">
      <div
        className="w-full h-full  bg-black/50 flex items-center justify-center"
        onClick={closeModal}
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
              onClick={closeModal}
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
