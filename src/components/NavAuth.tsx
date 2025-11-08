// src/components/NavAuth.tsx
"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function NavAuth() {
  return (
    <div className="ml-auto flex items-center gap-3">
      <SignedOut>
        <SignInButton mode="modal">
          <button className="px-3 py-2 rounded border text-sm">Sign in</button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </div>
  );
}
