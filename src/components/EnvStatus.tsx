// src/components/EnvStatus.tsx
"use client";

type Props = {
  publicVars: Record<string, boolean>;
  serverVars: Record<string, boolean>;
};

function Row({ label, ok }: { label: string; ok: boolean }) {
  return (
    <li className="flex items-center justify-between py-1">
      <span className="font-mono text-xs">{label}</span>
      <span className={ok ? "text-green-600" : "text-red-600"}>
        {ok ? "✅ set" : "⚠️ missing"}
      </span>
    </li>
  );
}

export default function EnvStatus({ publicVars, serverVars }: Props) {
  return (
    <section className="rounded border p-4 space-y-3">
      <h2 className="font-medium">Environment</h2>
      <p className="text-sm text-gray-500">
        Minimal check of required variables. Server-only vars are shown as booleans (never leaked).
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <h3 className="text-sm font-medium mb-2">Public (client)</h3>
          <ul>
            {Object.entries(publicVars).map(([k, v]) => (
              <Row key={k} label={k} ok={v} />
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Server (private)</h3>
          <ul>
            {Object.entries(serverVars).map(([k, v]) => (
              <Row key={k} label={k} ok={v} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
