// src/components/IntegrationDashboard.tsx
"use client";

import { useMemo, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import EnsureUser from "./EnsureUser";

export default function IntegrationDashboard() {
  const { isSignedIn, user } = useUser();
  const hello = useQuery(api.queries.hello); // undefined while loading
  const me = useQuery(api.users.me);         // null or object after EnsureUser
  const ping = useMutation(api.mutations.ping);

  const [pongTs, setPongTs] = useState<number | null>(null);
  const [pingErr, setPingErr] = useState<string | null>(null);
  const [pingBusy, setPingBusy] = useState(false);

  const helloLoading = useMemo(() => hello === undefined, [hello]);
  const meLoading = useMemo(() => isSignedIn && me === undefined, [isSignedIn, me]);

  return (
    <section className="space-y-4" aria-live="polite">
      <EnsureUser />

      {/* Auth card */}
      <div className="rounded border p-4">
        <h2 className="font-medium mb-2">Auth (Clerk)</h2>
        <p className="text-xs text-gray-500 mb-1">Proves Clerk session wiring.</p>
        {isSignedIn ? (
          <p className="text-sm">
            Signed in as <strong>{user?.primaryEmailAddress?.emailAddress}</strong>
          </p>
        ) : (
          <p className="text-sm text-gray-500">You are signed out.</p>
        )}
      </div>

      {/* Convex connectivity */}
      <div className="rounded border p-4">
        <h2 className="font-medium mb-2">Convex</h2>
        <p className="text-xs text-gray-500 mb-1">Query + mutation round trip.</p>

        <p className="text-sm">
          Server time (query):{" "}
          <code>
            {helloLoading ? "loading…" : hello?.ts ?? "—"}
          </code>
        </p>

        <div className="mt-2 flex items-center gap-2">
          <button
            className="px-3 py-2 rounded border text-sm focus:outline-none focus:ring-2 focus:ring-black/20 disabled:opacity-50"
            onClick={async () => {
              setPingErr(null);
              setPongTs(null);
              setPingBusy(true);
              try {
                const r = await ping();
                setPongTs(r.ts);
              } catch (e: any) {
                setPingErr(e?.message ?? "Ping failed");
              } finally {
                setPingBusy(false);
              }
            }}
            disabled={pingBusy}
          >
            {pingBusy ? "Pinging…" : "Ping Convex"}
          </button>

          {pongTs && (
            <span className="text-xs text-green-700">
              Pong at {new Date(pongTs).toLocaleTimeString()}
            </span>
          )}
          {pingErr && <span className="text-xs text-red-600">{pingErr}</span>}
        </div>
      </div>

      {/* User in Convex */}
      <div className="rounded border p-4">
        <h2 className="font-medium mb-2">User in Convex</h2>
        <p className="text-xs text-gray-500 mb-1">Created/updated via EnsureUser.</p>

        {!isSignedIn ? (
          <p className="text-sm text-gray-500">Sign in to create your Convex user.</p>
        ) : meLoading ? (
          <p className="text-sm text-gray-500">Creating user…</p>
        ) : me ? (
          <pre className="text-xs overflow-auto bg-gray-50 p-2 rounded border">
{JSON.stringify(me, null, 2)}
          </pre>
        ) : (
          <p className="text-sm text-amber-600">No user record found yet.</p>
        )}
      </div>
    </section>
  );
}
