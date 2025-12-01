import type React from "react";
import { twMerge } from "tailwind-merge";

interface IModal {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function Modal({ children, onClick, className }: IModal) {
  return (
    <div
      className={twMerge(
        "fixed inset-0 z-999 flex justify-center items-center bg-black/80",
        className
      )}
      onClick={onClick}
    >
      <div
        className="bg-[#212121] p-8 rounded-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
