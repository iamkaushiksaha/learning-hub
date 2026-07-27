import { ImageResponse } from "next/og";

/** Favicon: the KS accent block, generated at build time. */

export const dynamic = "force-static";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#7c6bff",
          borderRadius: 14,
          color: "#0b0d11",
          fontSize: 30,
          fontWeight: 700,
          fontFamily: "sans-serif",
        }}
      >
        KS
      </div>
    ),
    size,
  );
}
