# Auth Feature - Folder Structure & Components

This document outlines the recommended folder structure and component organization for the authentication feature.

## Folder Structure

```
src/
├── features/
│   └── auth/
│       ├── components/
│       │   ├── form-fields/
│       │   │   ├── email-field.tsx
│       │   │   ├── password-field.tsx
│       │   │   ├── confirm-password-field.tsx
│       │   │   └── index.ts
│       │   ├── sections/
│       │   │   ├── auth-header.tsx
│       │   │   ├── auth-footer.tsx
│       │   │   ├── auth-divider.tsx
│       │   │   ├── error-alert.tsx
│       │   │   ├── loading-spinner.tsx
│       │   │   └── index.ts
│       │   ├── layouts/
│       │   │   ├── auth-card-layout.tsx
│       │   │   ├── auth-page-layout.tsx
│       │   │   └── index.ts
│       │   └── index.ts
│       ├── pages/
│       │   ├── login-page.tsx
│       │   ├── register-page.tsx
│       │   ├── forgot-password-page.tsx
│       │   ├── reset-password-page.tsx
│       │   ├── change-password-page.tsx
│       │   └── index.ts
│       ├── hooks/
│       │   ├── use-login-form.ts
│       │   ├── use-register-form.ts
│       │   ├── use-reset-password-form.ts
│       │   ├── use-change-password-form.ts
│       │   └── index.ts
│       ├── types/
│       │   ├── auth.types.ts
│       │   └── index.ts
│       ├── constants/
│       │   ├── validation-rules.ts
│       │   ├── error-messages.ts
│       │   └── index.ts
│       └── index.ts
├── components/
│   └── ui/
│       ├── form.tsx
│       ├── input.tsx
│       ├── button.tsx
│       └── ...
└── ...
```

## Component Breakdown

### Form Fields (Reusable Input Components)

- **EmailField** - Email input with icon and validation
- **PasswordField** - Password input with visibility toggle
- **ConfirmPasswordField** - Password confirmation input
- **RoleSelectField** - Role dropdown select
- **PasswordStrengthField** - Password with strength indicator

### Sections (Structural Components)

- **AuthHeader** - Brand logo, title, subtitle
- **AuthFooter** - Footer with links
- **AuthDivider** - "OR" divider
- **ErrorAlert** - Error message display
- **LoadingSpinner** - Loading state indicator
- **SpiritualAccentBg** - Background pattern

### Layouts (Container Components)

- **AuthCardLayout** - Centered card container with styling
- **AuthPageLayout** - Full page layout with main + footer

### Pages (Screen Components)

- **LoginPage** - Login screen
- **RegisterPage** - Register screen
- **ForgotPasswordPage** - Forgot password screen
- **ResetPasswordPage** - Reset password screen
- **ChangePasswordPage** - Change password screen

### Custom Hooks (Business Logic)

- **useLoginForm** - Login form logic and validation
- **useRegisterForm** - Register form logic and validation
- **useResetPasswordForm** - Reset password form logic
- **useChangePasswordForm** - Change password form logic

## Component Guidelines

### Size Guidelines

- **Form Fields**: 50-80 lines (focused, single responsibility)
- **Sections**: 40-100 lines (layout blocks)
- **Layouts**: 60-120 lines (container logic)
- **Pages**: 100-150 lines (orchestration only)
- **Custom Hooks**: 50-100 lines (logic extraction)

### Import Organization

1. React imports
2. Third-party library imports (lucide-react, react-hook-form)
3. shadcn/ui component imports
4. Local component imports
5. Hook imports
6. Type imports
7. Constant imports

### Props Pattern

```typescript
interface ComponentNameProps {
  // Required props
  requiredProp: string
  // Optional props with defaults
  optionalProp?: boolean
  // Event handlers
  onAction?: (value: string) => void
}
```

## Implementation Priority

1. **Utilities & Constants** - Validation rules, error messages
2. **Types** - Auth types and interfaces
3. **Custom Hooks** - Form logic (useLoginForm, etc.)
4. **Form Fields** - Individual input components
5. **Sections** - Structural components (header, footer, divider)
6. **Layouts** - Container components
7. **Pages** - Full screen implementations

## Example: EmailField Component

```typescript
// src/features/auth/components/form-fields/email-field.tsx
import { Mail } from 'lucide-react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';

interface EmailFieldProps {
  form: UseFormReturn<any>;
  label?: string;
  placeholder?: string;
}

export function EmailField({
  form,
  label = 'EMAIL ADDRESS',
  placeholder = 'administrator@church.org',
}: EmailFieldProps) {
  return (
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem className="space-y-xs">
          <FormLabel className="font-label-md text-label-md text-on-surface-variant ml-xs">
            {label}
          </FormLabel>
          <FormControl>
            <div className="relative group">
              <Mail className="absolute left-md top-1/2 -translate-y-1/2 text-outline group-focus-within:text-on-primary-fixed transition-colors w-5 h-5" />
              <Input
                placeholder={placeholder}
                type="email"
                className="pl-xl pr-md py-md rounded-lg border border-outline-variant bg-surface-bright text-on-surface font-body-md focus:outline-none focus:border-on-primary-fixed focus:ring-2 focus:ring-secondary-container/20 transition-all"
                {...field}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
```

## File Naming Conventions

- Components: PascalCase (EmailField.tsx)
- Hooks: camelCase with 'use' prefix (useLoginForm.ts)
- Types: PascalCase (Auth.types.ts)
- Constants: camelCase or UPPER_SNAKE_CASE (validationRules.ts)
- Pages: PascalCase with '-page' suffix (LoginPage.tsx)

## Export Pattern

Each folder has an `index.ts` barrel export:

```typescript
// src/features/auth/components/form-fields/index.ts
export { EmailField } from "./email-field"
export { PasswordField } from "./password-field"
export { ConfirmPasswordField } from "./confirm-password-field"
```

This allows cleaner imports:

```typescript
import {
  EmailField,
  PasswordField,
} from "@/features/auth/components/form-fields"
```
