// src/components/ApiStatus.tsx
"use client";

import { useState } from "react";

export default function ApiStatus() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function testPrivateApi() {
    setError(null);
    setData(null);
    setLoading(true);
    try {
      const res = await fetch("/api/private/check");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded border p-4 space-y-3">
      <h2 className="font-medium">Private API Check</h2>
      <p className="text-sm text-gray-500">
        Verifies that authenticated requests to <code>/api/private/check</code> succeed.
      </p>

      <button
        onClick={testPrivateApi}
        className="px-3 py-2 rounded border text-sm"
        disabled={loading}
      >
        {loading ? "Checking..." : "Check /api/private/check"}
      </button>

      {error && <p className="text-sm text-red-600">Error: {error}</p>}

      {data && (
        <pre className="text-xs bg-gray-50 p-2 rounded border overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </section>
  );
}
