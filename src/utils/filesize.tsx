export function formatFileSize(size?: number): string {
  if (!size) return "-";

  if (size < 1024) return `${size} B`; // bytes
  if (size < 1024 * 1024) return `${Math.ceil(size / 1024)} KB`; // KB, round up
  return `${(size / 1024 / 1024).toFixed(1)} MB`; // MB, one decimal
}
