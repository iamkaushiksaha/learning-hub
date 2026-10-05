import { ImageResponse } from "next/og";
import { TOPICS, getTopic, seriesTopics } from "@/lib/topics";
import { SITE_NAME, SITE_AUTHOR } from "@/lib/site";

/** Branded 1200x630 Open Graph cards.
 *
 *  /og/home     — the learning hub
 *  /og/profile  — the apex landing page (a person, not an article)
 *  /og/<slug>   — one per topic in the registry
 *
 *  Prerendered at build time. House tokens are hardcoded — OG images cannot
 *  read CSS variables. */

export const dynamic = "force-static";

const C = {
  bg: "#0b0d11",
  surface: "#1c2027",
  border: "#262b34",
  text: "#f2f4f8",
  text2: "#a6aebf",
  text3: "#7a8290",
  accent: "#7c6bff",
  accentContrast: "#0b0d11",
};

export function generateStaticParams() {
  return [
    { slug: "home" },
    { slug: "profile" },
    ...TOPICS.map((t) => ({ slug: t.slug })),
  ];
}

const PROFILE_CHIPS = [
  "Microsoft Sentinel",
  "Defender XDR",
  "SOAR",
  "Agentic AI",
];

/** The landing page card. Leads with the person and the credential, because
 *  this is what gets shared into a recruiter's inbox or a LinkedIn feed. */
function profileCard() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: C.bg,
          backgroundImage:
            "linear-gradient(118deg, rgba(124,107,255,0.22) 0%, rgba(11,13,17,0) 52%)",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 14,
              backgroundColor: C.accent,
              color: C.accentContrast,
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            KS
          </div>
          <div style={{ display: "flex", fontSize: 28, color: C.text3 }}>
            kaushiksaha.com
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 700, color: C.text, letterSpacing: -2 }}>
            Kaushik Saha
          </div>
          <div style={{ display: "flex", fontSize: 44, color: C.accent, lineHeight: 1.15, maxWidth: 940 }}>
            Cloud Security Architect · SC-100
          </div>
          <div style={{ display: "flex", fontSize: 28, color: C.text2, lineHeight: 1.4, maxWidth: 900 }}>
            12 years in cybersecurity. Governed agentic AI for security operations.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {PROFILE_CHIPS.map((chip) => (
            <div
              key={chip}
              style={{
                display: "flex",
                padding: "10px 22px",
                borderRadius: 999,
                backgroundColor: C.surface,
                border: `1px solid ${C.border}`,
                color: C.text2,
                fontSize: 24,
              }}
            >
              {chip}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  if (slug === "profile") return profileCard();

  const topic = slug === "home" ? undefined : getTopic(slug);

  const title =
    topic?.title ?? "Learn the system. Defend the outcome.";
  const seriesLine =
    topic?.seriesId && topic.part
      ? `${topic.seriesTitle} · Part ${topic.part} of ${seriesTopics(topic.seriesId).length}`
      : "Agentic AI · detection engineering · secure delivery";
  const tags = topic?.tags?.slice(0, 4) ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: C.bg,
          backgroundImage:
            "linear-gradient(135deg, rgba(124,107,255,0.14) 0%, rgba(11,13,17,0) 45%)",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 14,
              backgroundColor: C.accent,
              color: C.accentContrast,
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            KS
          </div>
          <div style={{ display: "flex", fontSize: 30, color: C.text2 }}>
            {SITE_NAME}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", fontSize: 26, color: C.accent }}>
            {seriesLine}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 48 ? 56 : 64,
              lineHeight: 1.12,
              color: C.text,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          {tags.length > 0 && (
            <div style={{ display: "flex", gap: 14, marginTop: 6 }}>
              {tags.map((t) => (
                <div
                  key={t}
                  style={{
                    display: "flex",
                    padding: "8px 20px",
                    borderRadius: 999,
                    backgroundColor: C.surface,
                    border: `1px solid ${C.border}`,
                    color: C.text2,
                    fontSize: 23,
                  }}
                >
                  {t}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: "flex", fontSize: 24, color: C.text3 }}>
          {SITE_AUTHOR} · interactive deep dives with runnable examples
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
