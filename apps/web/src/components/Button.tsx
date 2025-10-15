import React, {
  type ButtonHTMLAttributes,
  type PropsWithChildren,
} from "react";
import { twMerge } from "tailwind-merge";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  color?: "primary" | "white";
  border?: boolean;
  buttonSize?: "sm" | "md" | "lg";
  ghost?: boolean;
}

export default function Button({
  className = "",
  border = false,
  color = "primary",
  ghost = false,
  buttonSize = "md",
  children,
  ...props
}: PropsWithChildren<IButton>) {
  const colorMap = {
    primary: "bg-primary text-white border-primary",
    white: "bg-white text-primary border-white",
  };

  const buttonSizeMap = {
    sm: "px-[0.5rem] py-[0.25rem] text-sm",
    md: "px-[0.75rem] py-[0.5rem] text-base",
    lg: "px-[1rem] py-[0.75rem] text-lg",
  };

  return (
    <button
      className={twMerge(
        `rounded-xl 
         ${colorMap[color]} 
         ${buttonSizeMap[buttonSize]} 
         cursor-pointer 
         ${border ? "border-2" : "border-transparent"} 
         ${ghost ? "bg-transparent" : ""}`,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
