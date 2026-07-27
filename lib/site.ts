/** Site-wide constants. Set NEXT_PUBLIC_SITE_URL on Vercel (or leave the
 *  fallback while local); every absolute URL derives from this. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://learning-hub.vercel.app";

export const SITE_NAME = "Security Research Hub";
export const SITE_AUTHOR = "Kaushik Saha";
export const SITE_DESCRIPTION =
  "Kaushik Saha's learning and research hub — Microsoft Sentinel, detection engineering, DevOps automation, threat hunting, and security architecture.";
