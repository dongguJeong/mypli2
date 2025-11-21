import { twMerge } from "tailwind-merge";

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  color?: "primary" | "black" | "white";
  border?: boolean;
  ghost?: boolean;
  inputSize?: "sm" | "md" | "lg";
  disabled?: boolean;
  left?: React.ReactNode;
  right?: React.ReactNode;
  error?: boolean;
  className?: string;
}

export default function Input({
  color = "primary",
  border = true,
  ghost,
  inputSize = "md",
  disabled = false,
  left,
  right,
  error,
  className,
  ...props
}: IInput) {
  const inputSizeMap = {
    sm: "py-[0.25rem] px-[0.5rem] text-[0.75rem]",
    md: "py-[0.5rem] px-[0.75rem] text-[1rem]",
    lg: "py-[0.75rem] px-[1rem] text-[1.25rem]",
  };

  const colorMap = {
    primary: {
      base: "text-white placeholder::text-white",
      border: "border-primary/80 focus-within:border-primary",
    },
    black: {
      base: "text-black",
      border: "border-black/80 focus-within:border-black",
    },
    white: {
      base: " text-white",
      border: "border-white/80 focus-within:border-white",
    },
  };

  return (
    <div
      className={twMerge(
        "flex items-center w-full outline-none gap-2 cursor-pointer ",
        inputSizeMap[inputSize],
        colorMap[color].base,
        disabled ? "bg-slate-500 text-white opacity-50 cursor-not-allowed" : "",
        ghost ? "bg-transparent" : "",
        border ? `border-2 ${colorMap[color].border}` : "border-transparent",
        ghost && "bg-transparent text-current",
        disabled && "bg-slate-500 text-white opacity-50 cursor-not-allowed",
        error && "border-red-500 focus-within:border-red-500 border-2",
        className
      )}
    >
      {left && <span className="mr-2">{left}</span>}
      <input {...props} disabled={disabled} className="outline-none" />
      {right && <span className="ml-2">{right}</span>}
    </div>
  );
}
