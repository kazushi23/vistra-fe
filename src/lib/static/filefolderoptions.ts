
export const MAX_FILE_SIZE_MB = 5; // maximum allowable file size
export const ALLOWED_TYPES = [ // all allowable file types
  // Documents
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/plain",
  "text/csv",
  "application/rtf",

  // Images
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/webp",
  "image/svg+xml",

  // Archives
  "application/zip",
  "application/x-7z-compressed",
];
export const ALLOWED_FILE_LENGTH = 10; // maximum allowable file length