// app/loading.tsx
export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-2">
        {/* Tailwind Spinner */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        <p className="text-lg font-medium text-slate-600">Loading content...</p>
      </div>
    </div>
  );
}
