const DEFAULT_DEBUGGER_URL =
  process.env.DEBUGGER_URL ?? "http://localhost:3010/";

console.log("/hub", DEFAULT_DEBUGGER_URL, 'wats url?')
export const DEFAULT_DEBUGGER_HUB_URL =

  process.env.NODE_ENV === "development"
    ? DEFAULT_DEBUGGER_URL + "/hub"
    : undefined;

export function createDebugUrl(frameURL: string | URL): string {
  try {
    const url = new URL("/", DEFAULT_DEBUGGER_URL);

    url.searchParams.set("url", frameURL.toString());

    return url.toString();
  } catch (error) {
    return "#";
  }
}
