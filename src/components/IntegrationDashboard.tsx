// src/components/IntegrationDashboard.tsx
"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import EnsureUser from "./EnsureUser";

export default function IntegrationDashboard() {
  const { isSignedIn, user } = useUser();

  // Example "hello" query and "ping" mutation (add if you haven't)
  const hello = useQuery(api.queries.hello) ?? null;
  const ping = useMutation(api.mutations.ping);
  const me = useQuery(api.users.me); // will be null until EnsureUser runs

  const [pongTs, setPongTs] = useState<number | null>(null);

  return (
    <section className="space-y-4">
      {/* Auto-provision user when signed in */}
      <EnsureUser />

      <div className="rounded border p-4">
        <h2 className="font-medium mb-2">Auth (Clerk)</h2>
        {isSignedIn ? (
          <p className="text-sm">
            Signed in as <strong>{user?.primaryEmailAddress?.emailAddress}</strong>
          </p>
        ) : (
          <p className="text-sm text-gray-500">You are signed out.</p>
        )}
      </div>

      <div className="rounded border p-4">
        <h2 className="font-medium mb-2">Convex</h2>
        <p className="text-sm">Server time (query): <code>{hello?.ts ?? "…"}</code></p>
        <button
          className="px-3 py-2 rounded border text-sm mt-2"
          onClick={async () => {
            const r = await ping();
            setPongTs(r.ts);
          }}
        >
          Ping Convex
        </button>
        {pongTs && (
          <p className="text-xs mt-2 text-green-600">
            Pong at {new Date(pongTs).toLocaleTimeString()}
          </p>
        )}
      </div>

      <div className="rounded border p-4">
        <h2 className="font-medium mb-2">User in Convex</h2>
        {!isSignedIn ? (
          <p className="text-sm text-gray-500">Sign in to create your Convex user.</p>
        ) : me ? (
          <pre className="text-xs overflow-auto bg-gray-50 p-2 rounded border">
{JSON.stringify(me, null, 2)}
          </pre>
        ) : (
          <p className="text-sm text-gray-500">Creating user…</p>
        )}
      </div>
    </section>
  );
}
