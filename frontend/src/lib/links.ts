const SUNGROW_BASE = "https://www.sungrowpower.com/in/en";

export function sungrowUrl(path: string): string {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${SUNGROW_BASE}/${cleanPath}`;
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
