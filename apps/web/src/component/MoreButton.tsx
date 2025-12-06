import { useState } from "react";
import Button from "./Button";
import { IoIosMore } from "react-icons/io";

interface IMoreButton {
  items: {
    text: string;
    onClick: () => void;
  }[];
}

export default function MoreButton({ items }: IMoreButton) {
  const [open, setOpen] = useState(false);

  function toggleMenu() {
    setOpen(!open);
  }

  return (
    <Button
      ghost
      className="self-center relative p-0"
      onClick={toggleMenu}
      buttonSize="sm"
    >
      <IoIosMore className="w-10 h-5" />
      {open && (
        <ul className="absolute top-10 left-5 bg-slate-700 rounded-sm text-white flex flex-col w-20 z-10">
          {items.map((v) => (
            <li
              className="text-start py-2 px-3 border-white/20 border-b  last:border-none"
              key={v.text}
              onClick={(e) => {
                e.stopPropagation();
                v.onClick();
                setOpen(false);
              }}
            >
              {v.text}
            </li>
          ))}
        </ul>
      )}
    </Button>
  );
}
