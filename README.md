# shadcn/ui monorepo template

This is a TanStack Start monorepo template with shadcn/ui.

## Adding components

To add components to your app, run the following command at the root of your `web` app:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

This will place the ui components in the `packages/ui/src/components` directory.

## Using components

To use the components in your app, import them from the `ui` package.

```tsx
import { Button } from "@workspace/ui/components/button"
```

apps/web/
src/
app/ # TanStack Start routing / app entry
features/ # 💡 core of your app
shared/ # reusable across features
entities/ # (optional) domain models
lib/ # low-level utilities
styles/

package.json

## Example features folder structure

A recommended layout where each feature (domain) is a self-contained module. Keep shared UI in `packages/ui` and small, focused feature folders inside `apps/web/src/features`.

Example:

```text
apps/web/src/features/
├─ auth/                 # Authentication flows
│  ├─ components/        # feature-specific UI components
│  │  ├─ LoginForm.tsx
│  │  └─ OAuthButton.tsx
│  ├─ hooks/
│  │  └─ useAuth.ts
│  ├─ api/
│  │  └─ auth.api.ts
│  ├─ pages/
│  │  └─ SignInPage.tsx
│  ├─ types.ts
│  ├─ styles.css
│  ├─ index.ts           # public exports for the feature
│  └─ __tests__/         # unit/interaction tests colocated
│     └─ auth.test.tsx
├─ users/                # user management feature
│  ├─ components/
│  ├─ hooks/
│  ├─ api/
│  ├─ types.ts
│  └─ index.ts
├─ dashboard/            # dashboard UI and widgets
│  ├─ components/
│  ├─ widgets/
│  ├─ routes.tsx
│  └─ index.ts
└─ shared/               # small cross-feature helpers (use sparingly)
   ├─ components/
   ├─ hooks/
   └─ utils/
```

Notes:

- Keep each feature self-contained and export its public API from `index.ts`.
- Put truly reusable UI in `packages/ui` and commons (helpers) in `shared/`.
- Prefer colocated tests in `__tests__` or `tests/` inside the feature.
- Keep feature sizes small and focused to make maintenance easier.

  features/
  auth/
  api/
  components/
  hooks/
  routes/
  schemas/
  utils/
  index.ts

  members/
  api/
  components/
  hooks/
  routes/
  schemas/
  utils/
  index.ts

  donations/
  api/
  components/
  hooks/
  routes/
  schemas/
  utils/
  index.ts

{
"scripts": {
"lint": "eslint .",
"lint:fix": "eslint . --fix",
"lint:strict": "eslint . --max-warnings=0",
"format": "prettier . --write",
"format:check": "prettier . --check"
}
}
