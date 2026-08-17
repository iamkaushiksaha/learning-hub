/** Set NEXT_PUBLIC_SITE_URL in the chosen hosting environment. The local
 * fallback avoids claiming an unrelated production URL. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const SITE_NAME = "KS Security Research";
export const SITE_AUTHOR = "Kaushik Saha";
export const SITE_DESCRIPTION =
  "A structured cybersecurity learning atlas covering governed agentic AI, LLM observability, detection engineering, and secure delivery.";
