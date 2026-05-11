<!-- Authentication guide for frontend and backend developers -->

# Authentication — API Guide

This document describes the authentication API (server) and how frontend and other developers should integrate with it.

Summary

- Base API prefix: `/api` with versioning in the URI (v1): e.g. `/api/v1/auth/login` when the server runs with the default prefix.
- Swagger UI: `http://localhost:3000/docs` (see [apps/api/src/main.ts](../apps/api/src/main.ts)).

Environment / setup

- Required env vars (minimum):
  - `DATABASE_URL` — Postgres URL used by the backend.
  - `JWT_SECRET` — Secret used to sign access tokens.
  - `JWT_REFRESH_EXPIRATION` or `JWT_REFRESH_EXPIRY` — refresh token lifetime (e.g. `7d`).
  - `RESEND_API_KEY` (optional) — used to send password-reset emails in production.
  - `APP_URL` (optional) — used to build reset links in emails.

Quickstart (developer machine)

1. Ensure `DATABASE_URL` points to a dev DB and run migrations (drizzle).
2. From monorepo root:

```bash
pnpm --filter api start:dev
```

If you want an end-to-end smoke test, run the Bruno collection in `bruno/auth-api` (see the Bruno README in that folder).

Auth endpoints (high level)

- POST `/api/v1/auth/login` — body: `{ email, password }`. Returns `{ accessToken, refreshToken, user }`.
- POST `/api/v1/auth/register` — admin-only endpoint to create users.
- POST `/api/v1/auth/refresh` — body: `{ refreshToken }`. Rotates refresh token and issues new access token.
- POST `/api/v1/auth/logout` — revokes a refresh token for the current user.
- POST `/api/v1/auth/forgot-password` — request reset link (always returns a neutral success message).
- POST `/api/v1/auth/reset-password` — body: `{ token, newPassword }` — apply reset.
- PATCH `/api/v1/auth/change-password` — authenticated users change password.
- GET `/api/v1/auth/me` — returns the current authenticated user.

Authentication model (summary)

- Access tokens: JWTs (short lived). Sent in requests with `Authorization: Bearer <accessToken>`.
- Refresh tokens: opaque random tokens (hex) stored server-side as a SHA256 hash; clients keep the raw token.
- Refresh flow: client sends `refreshToken` to `/refresh`, server validates hash with timing-safe compare, rotates tokens (delete old, insert new).

Frontend integration notes (concise)

- Login: call `/auth/login`, store `accessToken` in memory (or http-only cookie if you implement that on the frontend/backend). Store `refreshToken` securely (consider http-only secure cookie for web apps).
- For requests requiring auth: include `Authorization: Bearer <accessToken>` header.
- On 401 from protected endpoints, call `/auth/refresh` with the `refreshToken`. If refresh succeeds, retry the failed request with the new access token. If refresh fails, redirect to login.
- Changing password will by default revoke all refresh tokens for the user; `change-password` accepts `currentRefreshToken` to preserve a single session if desired.

Examples

Login (curl)

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"P@ssw0rd1!"}'
```

Refresh (curl)

```bash
curl -X POST http://localhost:3000/api/v1/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"<raw_refresh_token>"}'
```

Developer notes

- DTO definitions exist under `apps/api/src/auth/dto/*.ts` — these mirror the expected request shapes and include validation rules.
- The API exposes Swagger docs at `/docs` — this is the source of truth for request/response shapes and quick testing.
- The Bruno collection in `bruno/auth-api` contains example requests you can run with the Bruno CLI.

Security & operational notes

- Refresh tokens are rotated on use. Expired or invalid tokens are deleted from the DB.
- Password reset tokens expire after 1 hour and are stored hashed in the DB.
- When integrating the frontend, prefer http-only secure cookies for `refreshToken` to reduce XSS risk.

Where to look in the code

- `apps/api/src/auth/auth.service.ts` — core logic for login/refresh/logout/reset/change/me.
- `apps/api/src/auth/auth.controller.ts` — controller + route definitions and Swagger tags.
- `apps/api/src/auth/strategies/jwt.strategy.ts` and `apps/api/src/auth/guards/*` — request auth/role guards.
- `apps/api/src/main.ts` — Swagger setup and global pipes.

If anything is unclear or you'd like example client code (React + fetch/axios) for token handling, I can add it here.
