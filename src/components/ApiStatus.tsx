// src/components/ApiStatus.tsx
"use client";

import { useState } from "react";

export default function ApiStatus() {
  const [health, setHealth] = useState<any>(null);
  const [privateCheck, setPrivateCheck] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function testHealth() {
    setError(null);
    try {
      const res = await fetch("/api/health");
      const data = await res.json();
      setHealth(data);
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function testPrivate() {
    setError(null);
    try {
      const res = await fetch("/api/private/check");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setPrivateCheck(data);
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <section className="rounded border p-4 space-y-3">
      <h2 className="font-medium">API & Health Status</h2>

      <div className="space-x-2">
        <button onClick={testHealth} className="px-3 py-1 rounded border text-sm">
          Check /api/health
        </button>
        <button onClick={testPrivate} className="px-3 py-1 rounded border text-sm">
          Check /api/private/check
        </button>
      </div>

      {error && <p className="text-sm text-red-600">Error: {error}</p>}

      {health && (
        <pre className="text-xs bg-gray-50 p-2 rounded border overflow-auto">
          {JSON.stringify(health, null, 2)}
        </pre>
      )}
      {privateCheck && (
        <pre className="text-xs bg-gray-50 p-2 rounded border overflow-auto">
          {JSON.stringify(privateCheck, null, 2)}
        </pre>
      )}
    </section>
  );
}
