/** The two public faces of this one deployment.
 *
 *  kaushiksaha.com      → the landing page (who I am, what I build)
 *  hub.kaushiksaha.com  → the learning hub (topics, presentations)
 *
 *  Both are served by the same Railway service; `middleware.ts` routes by
 *  Host header. Keeping the strings here means a domain change is one edit.
 */
export const APEX_HOSTS = ["kaushiksaha.com", "www.kaushiksaha.com"] as const;

export const APEX_URL = "https://kaushiksaha.com";
export const HUB_URL = "https://hub.kaushiksaha.com";

/** Paths that belong to the hub. Requested on the apex, they are redirected. */
export const HUB_PATHS = ["/topics", "/presentations"] as const;

export function isApexHost(host: string | null | undefined): boolean {
  if (!host) return false;
  const name = host.split(":")[0].toLowerCase();
  return (APEX_HOSTS as readonly string[]).includes(name);
}
