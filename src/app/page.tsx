// src/app/page.tsx
import NavAuth from "@/components/NavAuth";
import IntegrationDashboard from "@/components/IntegrationDashboard";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-2xl p-6 space-y-6">
      <header className="flex items-center">
        <h1 className="text-2xl font-semibold">Connext Boilerplate</h1>
        <NavAuth />
      </header>

      <p className="text-gray-500 text-sm">
        Minimal Next.js + Convex + Clerk integration dashboard
      </p>

      <IntegrationDashboard />
    </main>
  );
}
