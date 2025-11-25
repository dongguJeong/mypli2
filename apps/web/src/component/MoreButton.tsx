import { useState } from "react";
import Button from "./Button";
import { IoIosMore } from "react-icons/io";

interface IMoreButton {
  items: {
    text: string;
    onClick: (props?: any) => void;
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
      className="self-center relative"
      onClick={toggleMenu}
      buttonSize="sm"
    >
      <IoIosMore className="w-10 h-5" />
      {open && (
        <ul className="absolute top-10 left-5 bg-slate-700 rounded-sm text-white flex flex-col w-20">
          {items.map((v) => (
            <li
              className="text-start py-2 px-3 "
              key={v.text}
              onClick={(e) => {
                e.stopPropagation();
                v.onClick(e);
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
