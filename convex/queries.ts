// convex/queries.ts
import { query } from "./_generated/server";

export const hello = query(async ({ auth }) => {
  const identity = await auth.getUserIdentity();
  return { ok: true, userId: identity?.subject ?? null, ts: Date.now() };
});
