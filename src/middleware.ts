// src/middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Mark specific routes as protected
const isProtectedRoute = createRouteMatcher([
  "/protected(.*)",
  // "/api/private(.*)", // commented out because /api/private/check currently handles auth() manually (so we can return 401 instead of middleware 404); uncomment if you add other API routes that should be protected via middleware instead

]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect(); // redirect to sign-in if unauthenticated
  }
});

// Run on everything except Next internals & static assets; always run for API
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
