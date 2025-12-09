"use client";
export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4">
      <h2 className="text-2xl font-bold">システムエラーが発生しました</h2>
      <p className="text-gray-500">予期せぬ問題が発生しました。</p>
      <button
        onClick={() => reset()}
        className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
      >
        もう一度試す
      </button>
    </div>
  );
}
