// src/app/protected/page.tsx
import { auth } from "@clerk/nextjs/server";
import ApiStatus from "@/components/ApiStatus";

export default async function ProtectedPage() {
  const { userId, sessionId } = await auth();

  // If someone bypassed middleware (edge-case), you can still guard here:
  if (!userId) {
    // Normally you'd redirect("/sign-in") — but middleware already handles it.
    return null;
  }

  return (
    <main className="mx-auto max-w-2xl p-6 space-y-2">
      <h1 className="text-2xl font-semibold">Protected</h1>
      <p className="text-sm">You’re signed in.</p>
      <div className="text-xs rounded border p-3 bg-gray-50">
        <div><strong>userId:</strong> {userId}</div>
        <div><strong>sessionId:</strong> {sessionId}</div>
      </div>

      <ApiStatus />
    </main>
  );
}
