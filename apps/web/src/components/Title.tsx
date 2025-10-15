import { twMerge } from "tailwind-merge";

interface TitleProps {
  text: string;
  className?: string;
}

const Title = ({ text, className }: TitleProps) => {
  return (
    <h1 className={twMerge("text-3xl font-semibold", className)}>{text}</h1>
  );
};

export default Title;
