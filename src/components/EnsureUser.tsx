// src/components/EnsureUser.tsx
"use client";

import { useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function EnsureUser() {
  const called = useRef(false);
  const { isSignedIn, user } = useUser();
  const ensureUser = useMutation(api.users.ensureUser);

  useEffect(() => {
    if (!isSignedIn || !user || called.current) return;
    called.current = true;

    void ensureUser({
      clerkId: user.id,
      email: user.primaryEmailAddress?.emailAddress,
      name: user.fullName ?? user.username ?? undefined,
      imageUrl: user.imageUrl,
    });
  }, [isSignedIn, user, ensureUser]);

  return null;
}
