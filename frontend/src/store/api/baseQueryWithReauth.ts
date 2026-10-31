import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

export interface CustomError {
  code: string;
  message: string;
  field?: string;
}

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "/api/auth";
  }
  // Node.js test environment requires absolute URL
  return "http://localhost:3000/api/auth";
};

const rawBaseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(),
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
  },
});

// Endpoints that should NEVER trigger a silent token refresh on 401
const SKIP_REFRESH_ENDPOINTS = [
  "/login",
  "/login-code",
  "/register",
  "/send-code",
  "/refresh",
  "/logout",
];

// Shared mutex for simultaneous 401s
let refreshPromise: Promise<boolean> | null = null;

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  CustomError
> = async (args, api, extraOptions) => {
  const url = typeof args === "string" ? args : args.url;

  // Initial attempt
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const shouldSkipRefresh = SKIP_REFRESH_ENDPOINTS.some((endpoint) =>
      url.includes(endpoint)
    );

    if (!shouldSkipRefresh) {
      if (!refreshPromise) {
        // First in-flight request initiates the refresh
        refreshPromise = (async () => {
          try {
            const refreshResult = await rawBaseQuery(
              { url: "/refresh", method: "POST" },
              api,
              extraOptions
            );
            return !refreshResult.error;
          } catch {
            return false;
          } finally {
            refreshPromise = null;
          }
        })();
      }

      // Wait for the single refresh call to complete
      const refreshed = await refreshPromise;

      if (refreshed) {
        // Retry the original request
        const retryResult = await rawBaseQuery(args, api, extraOptions);
        if (retryResult.error) {
          return { error: normalizeError(retryResult.error) };
        }
        return retryResult;
      }
    }

    // Refresh failed or skipped: return normalized 401
    return { error: normalizeError(result.error) };
  }

  if (result.error) {
    return { error: normalizeError(result.error) };
  }

  return result;
};

export function normalizeError(err: FetchBaseQueryError): CustomError {
  const statusStr = String(err.status ?? "500");
  const data = err.data as Record<string, unknown> | undefined;

  let message = "An error occurred";
  let field: string | undefined = undefined;

  if (data && typeof data === "object") {
    if (typeof data.error === "string") {
      message = data.error;
    } else if (typeof data.message === "string") {
      message = data.message;
    }

    if (typeof data.field === "string") {
      field = data.field;
    } else if (data.details && typeof data.details === "object") {
      // Check for zod format details: e.g. details: { email: { _errors: [...] } }
      const details = data.details as Record<string, { _errors?: string[] }>;
      const firstField = Object.keys(details).find(
        (key) => key !== "_errors" && details[key]?._errors?.length
      );
      if (firstField) {
        field = firstField;
        const fieldError = details[firstField]?._errors?.[0];
        if (fieldError) message = fieldError;
      }
    }
  } else if (err.status === "FETCH_ERROR") {
    message = "Network connection failed. Please try again.";
  }

  return {
    code: statusStr,
    message,
    field,
  };
}
