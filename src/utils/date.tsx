
export function GetDatetimeString(unixmilli: number): string {
  return unixmilli
    ? new Date(unixmilli).toLocaleString("en-SG", {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        year: "numeric",
        month: "short",
        day: "2-digit",
      })
    : "-";
}