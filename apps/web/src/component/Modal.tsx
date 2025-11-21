import type React from "react";
import Button from "./Button";
import { IoClose } from "react-icons/io5";
import { useModalStore } from "../store/modal-store";

interface IModal {
  children: React.ReactNode;
  title?: string;
}

export default function Modal({ children, title = "" }: IModal) {
  const { close } = useModalStore();

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/80"
      onClick={close}
    >
      <div
        className="w-88 bg-[#121212] flex flex-col gap-6 py-8 px-8 "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <span className="text-xl font-semibold">{title}</span>
          <Button ghost color="black" onClick={close} buttonSize="sm">
            <IoClose className="w-6 h-6" />
          </Button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
