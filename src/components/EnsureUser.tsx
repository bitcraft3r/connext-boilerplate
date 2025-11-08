// src/components/EnsureUser.tsx
"use client";

import { useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";

export default function EnsureUser() {
  const called = useRef(false);
  const { isSignedIn, user, isLoaded } = useUser();
  const ensureUser = useMutation(api.users.ensureUser);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user || called.current) return;
    called.current = true;
    (async () => {
      try {
        await ensureUser({
          clerkId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          name: user.fullName ?? user.username ?? undefined,
          imageUrl: user.imageUrl,
        });
      } catch (e) {
        // optional: toast/console.error
        console.error("ensureUser failed", e);
        called.current = false; // allow retry on next render if desired
      }
    })();
  }, [isLoaded, isSignedIn, user, ensureUser]);

  return null;
}
