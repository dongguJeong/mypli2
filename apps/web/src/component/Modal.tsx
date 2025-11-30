import type React from "react";

interface IModal {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Modal({ children, onClick }: IModal) {
  return (
    <div
      className="fixed inset-0 z-2147483647 flex justify-center items-center bg-black/80"
      onClick={onClick}
    >
      <div className="bg-[#212121] p-8" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
