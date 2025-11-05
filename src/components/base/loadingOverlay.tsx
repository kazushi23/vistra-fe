"use client";

export default function LoadingOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm z-10 rounded-lg">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
