// src/components/NavAuth.tsx
"use client";

import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function NavAuth() {
  return (
    <div className="ml-auto flex items-center gap-3">
      <ClerkLoading>
        <div className="h-8 w-20 rounded border animate-pulse" aria-hidden />
      </ClerkLoading>

      <ClerkLoaded>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-3 py-2 rounded border text-sm focus:outline-none focus:ring-2 focus:ring-black/20">
              Sign in
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </ClerkLoaded>
    </div>
  );
}
