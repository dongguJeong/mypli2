import { twMerge } from "tailwind-merge";

interface ITitle {
  text: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Title({ text, size = "md", className }: ITitle) {
  const titleSize = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <span className={twMerge("font-semibold", titleSize[size], className)}>
      {text}
    </span>
  );
}
