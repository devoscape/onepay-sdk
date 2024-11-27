export function isValidUrl(url: string): boolean {
  if (typeof url !== "string") return false;

  try {
    const parsedUrl = new URL(url);

    return parsedUrl.protocol === "https:" || parsedUrl.protocol === "http:";
  } catch {
    return false;
  }
}
