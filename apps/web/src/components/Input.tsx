import type { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  inputSize?: "sm" | "md" | "lg";
  border?: boolean;
  className?: string;
  error?: boolean;
}

export default function Input({
  rightIcon,
  leftIcon,
  inputSize = "md",
  border = true,
  error = false,
  className,
  ...props
}: IInput) {
  const inputSizeMap = {
    sm: "px-[0.5rem] py-[0.25rem] text-sm",
    md: "px-[0.75rem] py-[0.5rem] text-base",
    lg: "px-[1rem] py-[0.75rem] text-lg",
  };

  const paddingLeft = leftIcon ? "pl-10" : "pl-3";
  const paddingRight = rightIcon ? "pr-10" : "pr-3";

  return (
    <div
      className={twMerge(
        "relative w-full",
        error ? "border-red-600 border-2" : ""
      )}
    >
      {leftIcon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
          {leftIcon}
        </span>
      )}
      {rightIcon && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
          {rightIcon}
        </span>
      )}
      <input
        {...props}
        className={twMerge(
          "w-full rounded-md outline-none placeholder:text-gray-400 focus:ring-primary ",
          border ? "border border-white" : "border-none",
          inputSizeMap[inputSize],
          paddingLeft,
          paddingRight,
          className
        )}
      />
    </div>
  );
}
