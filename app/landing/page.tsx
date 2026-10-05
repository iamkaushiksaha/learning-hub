import type { Metadata } from "next";
import { LandingView } from "@/components/landing/landing-view";
import { APEX_URL } from "@/lib/hosts";

/** Served at https://kaushiksaha.com/ through the host rewrite in middleware.ts.
 *  Its canonical is the apex; the hub's canonical is the hub subdomain. */
export const metadata: Metadata = {
  title: { absolute: "Kaushik Saha — Cloud Security Architect" },
  description:
    "Cloud Security Architect (SC-100) with 12 years in security operations. I design Microsoft Sentinel, Defender XDR and SOAR solutions, and build governed agentic AI for the SOC.",
  alternates: { canonical: APEX_URL },
  openGraph: {
    type: "profile",
    url: APEX_URL,
    title: "Kaushik Saha — Cloud Security Architect",
    description:
      "Microsoft Sentinel, Defender XDR and SOAR, plus governed agentic AI for security operations.",
    images: [`${APEX_URL}/og/profile`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaushik Saha — Cloud Security Architect",
    description:
      "Microsoft Sentinel, Defender XDR and SOAR, plus governed agentic AI for security operations.",
    images: [`${APEX_URL}/og/profile`],
  },
};

export default function LandingPage() {
  return <LandingView />;
}
