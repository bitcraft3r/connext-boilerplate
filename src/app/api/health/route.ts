// src/app/api/health/route.ts
export async function GET() {
  return Response.json({
    ok: true,
    ts: Date.now(),
    message: "Connext Boilerplate API is healthy 🚀",
  });
}
