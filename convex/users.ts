// convex/users.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const ensureUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.optional(v.string()),
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (!existing) {
      const id = await ctx.db.insert("users", {
        clerkId: args.clerkId,
        email: args.email,
        name: args.name,
        imageUrl: args.imageUrl,
        createdAt: now,
        updatedAt: now,
      });
      return { created: true, id };
    }

    await ctx.db.patch(existing._id, {
      email: args.email ?? existing.email,
      name: args.name ?? existing.name,
      imageUrl: args.imageUrl ?? existing.imageUrl,
      updatedAt: now,
    });
    return { created: false, id: existing._id };
  },
});

export const me = query(async ({ auth, db }) => {
  const identity = await auth.getUserIdentity();
  if (!identity) return null;

  return await db
    .query("users")
    .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
    .first();
});
