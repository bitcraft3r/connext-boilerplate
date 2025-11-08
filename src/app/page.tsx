// src/app/page.tsx
import NavAuth from "@/components/NavAuth";
import IntegrationDashboard from "@/components/IntegrationDashboard";
import ApiStatus from "@/components/ApiStatus";
import EnvStatus from "@/components/EnvStatus";

export default function HomePage() {
  // Compute env presence on the server and pass booleans only
  const publicVars = {
    NEXT_PUBLIC_CONVEX_URL: !!process.env.NEXT_PUBLIC_CONVEX_URL,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  };

  const serverVars = {
    CONVEX_DEPLOYMENT: !!process.env.CONVEX_DEPLOYMENT, // optional — used by CLI, not app runtime
    CLERK_SECRET_KEY: !!process.env.CLERK_SECRET_KEY,
    CLERK_JWT_ISSUER_DOMAIN: !!process.env.CLERK_JWT_ISSUER_DOMAIN,
  };

  return (
    <main className="mx-auto max-w-2xl p-6 space-y-6">
      <header className="flex items-center gap-4">
        <h1 className="text-2xl font-semibold">Connext Boilerplate</h1>
        <NavAuth />
      </header>

      <p className="text-gray-500 text-sm">
        Minimal Next.js + Convex + Clerk integration dashboard
      </p>

      {/* Convex hello/ping, EnsureUser, and "me" view */}
      <IntegrationDashboard />

      {/* Private API check (/api/private/check) */}
      <ApiStatus />

      {/* Env presence (booleans only) */}
      <EnvStatus publicVars={publicVars} serverVars={serverVars} />

      <footer className="pt-2 text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <a className="underline" href="/protected">/protected</a>
          <a className="underline" href="/api/health" target="_blank" rel="noreferrer">/api/health</a>
        </div>
        <p className="mt-2">
          Tip: keep <code>npx convex dev</code> running so generated modules stay in sync.
        </p>
      </footer>
    </main>
  );
}
