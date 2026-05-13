# Auth Feature

This feature contains the authentication pages and shared UI used by the Next.js app.

## Routes

- `/auth/login` - sign in page
- `/auth/register` - account creation page
- `/auth/forgot-password` - password recovery placeholder page

## Structure

- `pages/` - route-level page components
- `components/` - shared auth UI and form sections
- `index.ts` - public exports for the feature pages

## Shared UI

The auth pages reuse a shared shell and common elements for:

- page layout and footer
- background accents and supporting illustration
- error alerts and loading states
- form field styling and button layout

## Notes

- Form labels use capitalize case.
- The auth pages currently use placeholder submit flows and can be wired to real authentication APIs later.
- Branding in this feature uses Good News Church CMS.
