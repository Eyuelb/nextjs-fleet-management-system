import {
  FetchErrorType,
  handleConnectionError,
} from "../fetch-errors";

const BASE_URL = process.env.NEXT_PUBLIC_BACK_END_API || ""; // localhost:8080

export default async function fetcher<T = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T | null> {
  const url = `${BASE_URL}/api/v1${input}`;
  try {
    const res = await fetch(url, init);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data: T | null = await res.json();

    if (!data) {
      throw new Error("Invalid response from server");
    }

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to fetch data. Please try again later.", {
        cause: handleConnectionError(error as FetchErrorType),
      });
    } else {
      console.error("Unknown error occurred:", error);
      throw new Error("An unknown error occurred. Please try again later.");
    }
  }
}
