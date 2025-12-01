import { twMerge } from "tailwind-merge";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "black" | "white" | "gray";
  border?: boolean;
  ghost?: boolean;
  buttonSize?: "sm" | "md" | "lg";
  disabled?: boolean;
  left?: React.ReactNode;
  right?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export default function Button({
  color = "primary",
  border = false,
  ghost,
  buttonSize = "md",
  disabled = false,
  children,
  left,
  right,
  className,
  ...props
}: IButton) {
  const buttonSizeMap = {
    sm: "py-[0.25rem] px-[0.5rem] text-[0.75rem]",
    md: "py-[0.5rem] px-[0.75rem] text-[1rem]",
    lg: "py-[0.75rem] px-[1rem] text-[1.25rem]",
  };

  const colorMap = {
    primary: {
      base: "bg-primary text-white",
      border: "border-primary",
    },
    black: {
      base: "bg-black text-white",
      border: "border-black",
    },
    white: {
      base: "bg-white text-black",
      border: "border-white",
    },

    gray: {
      base: "bg-gray text-white",
      border: "border-gray",
    },
  };

  return (
    <button
      disabled={disabled}
      {...props}
      className={twMerge(
        "flex items-center cursor-pointer gap-2 rounded-sm",
        buttonSizeMap[buttonSize],
        !disabled && colorMap[color].base,
        ghost ? "bg-transparent" : "",
        border ? `border ${colorMap[color].border}` : "border-transparent",
        ghost && "bg-transparent text-current",
        disabled && "bg-slate-500 text-white opacity-50 cursor-not-allowed",
        className
      )}
    >
      {left && <span>{left}</span>}
      {children}
      {right && <span>{right}</span>}
    </button>
  );
}
