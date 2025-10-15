interface INoData {
  sentence: string;
}

export default function NoData({ sentence }: INoData) {
  return (
    <div className="w-full h-full text-center text-2xl flex items-center justify-center font-semibold">
      {sentence}
    </div>
  );
}
