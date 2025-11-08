// src/components/ApiStatus.tsx
"use client";

import { useState } from "react";

export default function ApiStatus() {
  const [health, setHealth] = useState<any>(null);
  const [privateCheck, setPrivateCheck] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<"health" | "private" | null>(null);

  async function testHealth() {
    setError(null);
    setHealth(null);
    setBusy("health");
    try {
      const res = await fetch("/api/health");
      const data = await res.json();
      setHealth(data);
    } catch (err: any) {
      setError(err?.message ?? "Health check failed");
    } finally {
      setBusy(null);
    }
  }

  async function testPrivate() {
    setError(null);
    setPrivateCheck(null);
    setBusy("private");
    try {
      const res = await fetch("/api/private/check");
      if (!res.ok) {
        if (res.status === 401) throw new Error("Unauthorized (401) — sign in first.");
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      setPrivateCheck(data);
    } catch (err: any) {
      setError(err?.message ?? "Private check failed");
    } finally {
      setBusy(null);
    }
  }

  return (
    <section className="rounded border p-4 space-y-3" aria-live="polite">
      <h2 className="font-medium">API & Health Status</h2>
      <p className="text-xs text-gray-500">Public health endpoint and authenticated API call.</p>

      <div className="space-x-2">
        <button
          onClick={testHealth}
          disabled={busy === "health"}
          className="px-3 py-1 rounded border text-sm focus:outline-none focus:ring-2 focus:ring-black/20 disabled:opacity-50"
        >
          {busy === "health" ? "Checking…" : "Check /api/health"}
        </button>

        <button
          onClick={testPrivate}
          disabled={busy === "private"}
          className="px-3 py-1 rounded border text-sm focus:outline-none focus:ring-2 focus:ring-black/20 disabled:opacity-50"
        >
          {busy === "private" ? "Checking…" : "Check /api/private/check"}
        </button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {health && (
        <pre className="text-xs bg-gray-50 p-2 rounded border overflow-auto">{JSON.stringify(health, null, 2)}</pre>
      )}
      {privateCheck && (
        <pre className="text-xs bg-gray-50 p-2 rounded border overflow-auto">{JSON.stringify(privateCheck, null, 2)}</pre>
      )}
    </section>
  );
}
