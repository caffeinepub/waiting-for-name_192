/**
 * Convert nanosecond timestamps (from Motoko) to a readable date string.
 * Motoko timestamps are in nanoseconds since epoch.
 */
export function formatDate(nanoseconds: bigint): string {
  // Convert nanoseconds to milliseconds
  const milliseconds = Number(nanoseconds / 1_000_000n);
  const date = new Date(milliseconds);

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatDateShort(nanoseconds: bigint): string {
  const milliseconds = Number(nanoseconds / 1_000_000n);
  const date = new Date(milliseconds);

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function getExcerpt(body: string, maxLength = 180): string {
  // Strip HTML tags
  const stripped = body
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (stripped.length <= maxLength) return stripped;
  return `${stripped.substring(0, maxLength).trim()}...`;
}
