# Connext Boilerplate

A lightweight full-stack Next.js starter preconfigured with **Convex** (database) and **Clerk** (authentication).

---

## 🚀 Overview

**Connext Boilerplate** wires up:
- ✅ Next.js (App Router, TypeScript)
- ✅ Clerk (authentication and user management)
- ✅ Convex (serverless database and backend functions)
- ✅ Middleware-ready auth for protected routes
- ✅ TailwindCSS (for styling)

This README covers setup **up to the initial integration of Clerk and Convex**, matching the steps completed so far.

---

## 🧩 Tech Stack

| Layer | Technology | Purpose |
|-------|-------------|----------|
| Frontend | [Next.js](https://nextjs.org/) | React-based framework for server/client rendering |
| Auth | [Clerk](https://clerk.com/) | Authentication and user management |
| Database | [Convex](https://convex.dev/) | Serverless data and backend functions |
| Styling | [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework |

---

## 🛠️ Setup Instructions

### 1. Clone and install dependencies

```bash
git clone https://github.com/bitcraft3r/connext-boilerplate.git
cd connext-boilerplate
pnpm install
```

### 2. Initialize Convex

Run Convex setup:

```bash
npx convex init
```

Follow the prompts to create your Convex project.  
This generates a `/convex` folder and connects your local project to your Convex deployment.

To start the local Convex dev server:

```bash
npx convex dev
```

This prints a development deployment URL, which you’ll add to `.env.local` later.

---

### 3. Set up Clerk

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/).  
2. Create a **new application**.  
3. Under **Authentication Methods**, enable **Email** and **Google** (default).  
4. Copy the following from your Clerk project settings:
   - **Publishable Key**
   - **Secret Key**

Add them to your `.env.local` file (see below).

---

### 4. Create a JWT Template in Clerk

1. Navigate to **JWT Templates** → **New Template**.  
2. Choose **Convex**.  
3. In the form:
   - **Name:** `convex`
   - **Issuer (iss):** your Clerk instance URL (e.g. `https://your-tenant.clerk.accounts.dev`)
   - **Audience (aud):** `convex`
4. Click **Save Changes**.
5. Copy the **Issuer URL** — you’ll need it for `.env.local` and Convex.

---

### 5. Environment Variables

Create a `.env.local` file in the project root:

```bash
# Convex
CONVEX_DEPLOYMENT=dev:your-convex-deployment-id
NEXT_PUBLIC_CONVEX_URL=https://your-convex-url.convex.cloud

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_123
CLERK_SECRET_KEY=sk_test_123
CLERK_JWT_ISSUER_DOMAIN=https://your-tenant.clerk.accounts.dev
```

> Also set the **CLERK_JWT_ISSUER_DOMAIN** environment variable in your **Convex dashboard** for your active deployment.

---

### 6. Configure Convex Auth

Convex reads the Clerk JWT for authorization.  
The following file was added automatically by Convex CLI:

`convex/auth.config.ts`
```ts
import { AuthConfig } from "convex/server";

export default {
  providers: [
    {
      domain: process.env.CLERK_JWT_ISSUER_DOMAIN!,
      applicationID: "convex",
    },
  ],
} satisfies AuthConfig;
```

This tells Convex to trust JWTs issued by Clerk for your deployment.

---

### 7. Add the Clerk + Convex Providers

Clerk and Convex need to wrap your app in React context providers.  
Following both official guides:

- [Convex Auth with Clerk (Next.js)](https://docs.convex.dev/auth/clerk#nextjs)
- [Clerk → Convex Integration Guide](https://clerk.com/docs/guides/development/integrations/databases/convex#configure-the-clerk-and-convex-providers)

#### `/src/components/ConvexClientProvider.tsx`
```tsx
"use client";

import { ReactNode } from 'react'
import { ConvexReactClient } from 'convex/react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { useAuth } from '@clerk/nextjs'

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  throw new Error('Missing NEXT_PUBLIC_CONVEX_URL in your .env file')
}

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL)

export default function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  )
}
```

#### `/src/app/layout.tsx`
```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "@/components/ConvexClientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Connext Boilerplate",
  description: "Lightweight full-stack Next.js starter with Convex and Clerk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClerkProvider>
          <ConvexClientProvider>
            {children}
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
```

---

### 8. Add Clerk Middleware

`/src/middleware.ts`
```ts
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    '/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
```

This middleware initializes Clerk on every request and enables auth on API routes.  
Protected routes can later be configured using `createRouteMatcher` if needed.

---

### 9. Run the Project

In one terminal, start Convex:
```bash
npx convex dev
```

In another terminal, start Next.js:
```bash
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000).

You should now be able to sign in with Clerk and your Convex functions will authenticate using Clerk-issued JWTs.

---

## ✅ Next Steps

- Add Convex queries and mutations (`/convex/queries.ts`, `/convex/mutations.ts`).
- Build a simple “Integration Dashboard” homepage to verify Clerk + Convex connectivity.
- Commit these initial files and push to GitHub.
- Prepare for deployment (Vercel + Convex Cloud).

---

### 📄 License
MIT
