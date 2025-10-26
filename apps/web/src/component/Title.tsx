interface ITitle {
  text: string;
}

export default function Title({ text }: ITitle) {
  return <span className="font-semibold text-xl">{text}</span>;
}
