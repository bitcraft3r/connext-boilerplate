import { mutation } from "./_generated/server";

export const ping = mutation(async ({ auth }) => {
  const identity = await auth.getUserIdentity();
  return { ok: true, action: "pong", userId: identity?.subject ?? null, ts: Date.now() };
});
