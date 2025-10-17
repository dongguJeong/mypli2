interface ErrorFallbackProps {
  error: any;
  resetErrorBoundary?: () => void;
}

export function ErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) {
  const message =
    error?.response?.data?.message || error?.message || "오류가 발생했습니다.";

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-3 text-center text-red-700">
      <p className="text-sm">{message}</p>
      {resetErrorBoundary && (
        <button
          onClick={resetErrorBoundary}
          className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          다시 시도
        </button>
      )}
    </div>
  );
}
