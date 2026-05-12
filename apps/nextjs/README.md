# Next.js App

This package contains the Next.js frontend for the Church Management System. The current focus is the auth experience for Good News Church CMS.

## Overview

- App router-based Next.js application
- Shared UI comes from `@workspace/ui`
- Auth pages use a shared shell, branded footer, and reusable form sections
- Styling is built with Tailwind CSS v4

## Routes

- `/` - app entry page
- `/auth/login` - sign in page
- `/auth/register` - account creation page
- `/auth/forgot-password` - password recovery placeholder page

## Structure

- `app/` - route segments, layouts, and global styles
- `features/auth/` - auth pages and shared auth components
- `public/` - static assets

## Scripts

Run these from `apps/nextjs`:

```bash
pnpm dev
pnpm dev:clean
pnpm build
pnpm start
pnpm lint
```

From the monorepo root, you can also use:

```bash
pnpm --filter nextjs dev
pnpm --filter nextjs build
pnpm --filter nextjs lint
```

## Notes

- Branding in this app uses Good News Church CMS.
- Form labels use capitalize case.
- The auth flows currently use placeholder submit handlers and can be connected to a real backend later.
