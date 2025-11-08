// src/app/api/private/check/route.ts
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  return Response.json({
    ok: true,
    userId,
    ts: Date.now(),
    message: "Private route authenticated successfully ✅",
  });
}
