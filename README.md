# Connext Boilerplate

A minimal, production-ready boilerplate integrating **Next.js 16**, **Clerk** (authentication), and **Convex** (database).  
It provides a preconfigured setup for auth, database, and API routes — so you can start building features instead of wiring dependencies.

---

## 🚀 Features

- 🔐 **Clerk Authentication** — fully wired with Next.js middleware and React providers.  
- 💾 **Convex Database** — backend functions, queries, and mutations ready for use.  
- 🔄 **Convex + Clerk Integration** — JWT template configured for secure identity sharing.  
- 🧱 **Minimal Dashboard** — shows auth state, Convex connectivity, API checks, and environment variables.  
- 🧭 **Protected Routes & APIs** — `/protected` route via Clerk middleware, `/api/private/check` for manual `auth()` testing.  
- 🩺 **Health Check** — `/api/health` public endpoint for uptime verification. 
- 🌀 **TailwindCSS**

---

## ⚙️ Setup

### 1️⃣ Install

```bash
git clone https://github.com/bitcraft3r/connext-boilerplate.git
cd connext-boilerplate
pnpm install
```

### 2️⃣ Initialize Convex

```bash
npx convex dev
```
This creates the `/convex` directory and generates `CONVEX_DEPLOYMENT` and `NEXT_PUBLIC_CONVEX_URL` in `.env.local`.

### 3️⃣ Configure Clerk

1. Create a new Clerk project at [clerk.com](https://clerk.com).  
2. Enable **Email** and **Google** sign-in (default).  
3. Copy your keys to `.env.local`:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

4. Create a **JWT Template** → choose **Convex** → click **Save Changes** → copy the **Issuer URL**.

```
CLERK_JWT_ISSUER_DOMAIN=https://your-tenant.clerk.accounts.dev
```

5. Add the same key in your Convex dashboard (Environment Variables).

---

## 🔗 Integrations

### Clerk
- Configured via `ClerkProvider` (App layout) and `clerkMiddleware` (Edge runtime).  
- Protects `/protected` routes automatically.  
- Uses `auth()` in server routes for identity access.  

### Convex
- Integrated with `ConvexProviderWithClerk` for client auth context.  
- Contains sample queries (`hello`) and mutations (`ping`).  
- Includes a user provisioning mutation (`ensureUser`) linked to Clerk’s user data.

### Next.js
- Uses the **App Router** (`src/app`) and modular client/server components.  
- `middleware.ts` handles auth at the edge; `/api` routes demonstrate protected and public APIs.  

---

## 🗂️ Project Structure

```
src/
  app/
    page.tsx               # Dashboard (server component)
    protected/             # Example protected route
    api/
      health/route.ts      # Public health endpoint
      private/check/route.ts # Protected API with manual auth() check
  components/              # Reusable UI & provider components
  middleware.ts            # Clerk edge middleware
convex/
  schema.ts                # Convex DB schema
  users.ts                 # ensureUser + me queries
  queries.ts, mutations.ts # hello + ping examples
.env.example               # Template for environment variables
```

---

## 🧭 Development Workflow

Run both Next.js and Convex locally:

```bash
npx convex dev
pnpm dev
```

Visit:

- `/` → Dashboard with live integration checks  
- `/protected` → Middleware-protected page  
- `/api/health` → Public JSON response  
- `/api/private/check` → Returns `401` if signed out, or user info if signed in

---

## ☁️ Deployment

Deploy easily on **Vercel** (Next.js) and **Convex Cloud**:

1. Add all environment variables in your Vercel project settings.  
2. Ensure the Convex deployment matches the URL in `NEXT_PUBLIC_CONVEX_URL`.  
3. Update Clerk allowed origins to include your deployed domain.  
