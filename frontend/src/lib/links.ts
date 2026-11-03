const EXTERNAL_BASE = "https://hindpowerproject.com";

export function externalUrl(path: string): string {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${EXTERNAL_BASE}/${cleanPath}`;
}

export const internalLinks = {
  home: "/",
  ciPvSolution: "/solution/ci-pv-solution",
  residentialSolution: "/solution/residential-pv-ess-ev-charging-solution",
  brandStory: "/about-us/brand-story",
  sustainability: "/sustainability",
  login: "/login",
  register: "/register",
} as const;
