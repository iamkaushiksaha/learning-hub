export const dynamic = "force-dynamic";

export function GET() {
  return Response.json(
    {
      status: "ok",
      service: "learning-hub",
      commit: process.env.RAILWAY_GIT_COMMIT_SHA ?? "local",
    },
    { status: 200, headers: { "Cache-Control": "no-store" } },
  );
}
