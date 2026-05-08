# Authentication Feature - Frontend Screens Implementation Guide

## Overview

This document outlines all 8 screens required for the authentication feature. Designs should be provided by the design team before implementation begins.

---

## Screen Specifications

### 1. Login Screen

**Route:** `/auth/login`  
**Access:** Public  
**Purpose:** User authentication entry point

#### Components:

- Email input field (validation: valid email format)
- Password input field (hidden)
- "Remember me" checkbox (optional)
- Submit button
- "Forgot password?" link → Forgot Password screen
- Error message display area
- Loading state indicator

#### Behaviors:

- Display generic "Invalid credentials" error on login failure
- Never reveal if email doesn't exist or password is wrong
- Rate limit messaging if 5+ attempts in 60 seconds
- Auto-focus email field on load
- Store access & refresh tokens on success
- Redirect to dashboard on successful login

#### API Calls:

- POST `/api/v1/auth/login` with `{ email, password }`

---

### 2. Register/Create User Screen (Admin Only)

**Route:** `/auth/register`  
**Access:** Admin only (protected route)  
**Purpose:** Admin creates system users

#### Components:

- Email input field (validation: unique, valid format)
- Password input field with strength indicator
- Confirm password field
- Role dropdown (ADMIN | PASTOR | DEPARTMENT_LEADER | FINANCE | VIEWER)
- Submit button
- Cancel button
- Error message display area
- Success message display area

#### Behaviors:

- Show password strength in real-time
- Match password confirmation
- Only visible to users with ADMIN role
- Show error "A user with this email already exists" if email taken
- Success message: "User created successfully"
- Clear form on successful submit
- Optional: redirect to user management list

#### API Calls:

- POST `/api/v1/auth/register` with `{ email, password, role }`

---

### 3. Forgot Password Screen

**Route:** `/auth/forgot-password`  
**Access:** Public  
**Purpose:** Initiate password reset flow

#### Components:

- Email input field (validation: valid email format)
- Submit button
- Back to login link
- Success/status message display area
- Loading state indicator

#### Behaviors:

- Always show: "If that email is registered, a reset link has been sent."
- Do NOT reveal if email exists or not (security: no user enumeration)
- Rate limit messaging if 5+ attempts in 60 seconds
- Disable submit button during loading
- Show loading spinner during request

#### API Calls:

- POST `/api/v1/auth/forgot-password` with `{ email }`

---

### 4. Reset Password Screen

**Route:** `/auth/reset-password`  
**Access:** Public (accessed via email link)  
**Purpose:** Complete password reset with token

#### Components:

- Extract token from URL query parameter (`?token=...`)
- New password input field with strength indicator
- Confirm new password field
- Submit button
- Back to login link
- Error message display area
- Success message display area
- Loading state indicator

#### Behaviors:

- Validate token exists in URL on mount
- Show error if token is invalid or expired: "This reset link is invalid or has expired."
- Show password strength indicator
- Match password confirmation validation
- Success message: "Password updated successfully. Please log in."
- Auto-redirect to login after 3-5 seconds on success
- Show token expiration time (1 hour) to user

#### API Calls:

- POST `/api/v1/auth/reset-password` with `{ token, newPassword }`

---

### 5. Change Password Screen (Authenticated)

**Route:** `/auth/change-password`  
**Access:** Authenticated users only  
**Purpose:** Authenticated user changes their password

#### Components:

- Current password field (hidden)
- New password field (hidden) with strength indicator
- Confirm new password field (hidden)
- "Log out all other devices" checkbox
- Submit button
- Cancel button
- Error message display area
- Success message display area
- Loading state indicator

#### Behaviors:

- Require current password for security
- Validate new password ≠ current password
- Show password strength for new password
- Match new password confirmation
- Optional: log out all other devices after password change
- Error: "Current password is incorrect."
- Success: "Password changed successfully."
- Redirect to dashboard after success

#### API Calls:

- PATCH `/api/v1/auth/change-password` with `{ currentPassword, newPassword, logoutOtherDevices? }`

---

### 6. User Dashboard/Profile Screen (Authenticated)

**Route:** `/dashboard` or `/profile`  
**Access:** Authenticated users only  
**Purpose:** Main authenticated user interface

#### Components:

- User information card:
  - User email display
  - User role badge (with color coding: ADMIN=red, PASTOR=blue, etc.)
  - Account created date
  - User ID (UUID)
- Navigation menu with:
  - Change Password link
  - Account Settings link
  - Logout button
- Welcome message: "Welcome, {email}"
- Current session information (optional):
  - Last login time
  - Session active time
- (Optional) Edit Profile button

#### Behaviors:

- Display user data from GET /api/v1/auth/me
- Show role-specific information/badges
- Logout clears tokens and redirects to login
- Auto-logout on 401 responses from API
- Display current user context in header

#### API Calls:

- GET `/api/v1/auth/me` (on mount for verification)
- POST `/api/v1/auth/logout` with `{ refreshToken }`

---

### 7. Protected Route Wrapper (Non-visual Component)

**Type:** Higher-Order Component / Middleware  
**Purpose:** Guard authenticated routes and manage token lifecycle

#### Features:

- Check if user is authenticated on app startup
- Redirect unauthenticated users to login
- Auto-refresh access token before expiration (1 minute before expiry)
- Handle 401 responses globally → redirect to login
- Persist tokens in HttpOnly cookies or secure storage
- Maintain auth state across page refreshes
- Clear tokens on logout

#### Implementation Details:

- Create auth context/provider for global auth state
- Store access token expiry time
- Implement token refresh timer
- Handle concurrent requests during refresh
- Validate token claims match user state

#### API Calls:

- GET `/api/v1/auth/me` (on app mount)
- POST `/api/v1/auth/refresh` (auto-refresh before expiry)

---

### 8. Navigation/Header Component (Authenticated Users)

**Type:** Reusable Component  
**Purpose:** Display authenticated user context and actions

#### Components:

- Current user email/name display
- User role badge (colored by role: ADMIN=red, PASTOR=blue, etc.)
- "Admin" badge/indicator (if ADMIN role)
- Change Password link
- Account Settings link
- Logout button
- (Optional) Register New User link (if ADMIN)

#### Behaviors:

- Display on all protected routes
- Update when user logs in/out
- Show role-specific options (e.g., register link for admins)
- Logout clears tokens and redirects
- Icon/avatar (optional)

#### Dynamic Content:

- Show/hide register link based on user role
- Show/hide admin-specific options based on role

---

## Token Storage Strategy

### For Web Applications:

```
Access Token:
  - Store in HttpOnly, Secure, SameSite=Strict cookie
  - Expiry: 15 minutes
  - Automatically sent with API requests (browser handles)

Refresh Token:
  - Store in HttpOnly, Secure, SameSite=Strict cookie
  - Expiry: 30 days
  - Used only by auto-refresh logic
  - Never exposed to JavaScript
```

### For Mobile Applications:

```
Access Token:
  - Store in SecureStore (Expo SecureStore, iOS Keychain, Android Keystore)
  - Expiry: 15 minutes
  - Manually attach to API requests

Refresh Token:
  - Store in SecureStore
  - Expiry: 30 days
  - Used only by auto-refresh logic
  - Never stored in plain text
```

---

## Security Checklist

### Password Fields:

- [ ] Hide password while typing (use type="password")
- [ ] Never log passwords to console
- [ ] Never transmit passwords over HTTP (HTTPS only)
- [ ] Validate min 8 characters, 1 uppercase, 1 number, 1 symbol on frontend
- [ ] Match password fields before submission

### Tokens:

- [ ] Store in HttpOnly cookies (web) or SecureStore (mobile)
- [ ] Never store in localStorage
- [ ] Never transmit tokens in URL parameters
- [ ] Never expose tokens in console logs
- [ ] Auto-refresh before expiration
- [ ] Clear on logout and 401 responses

### Error Messages:

- [ ] Generic errors for login: "Invalid credentials" (not "email not found")
- [ ] Always success message for forgot password (prevent user enumeration)
- [ ] Never reveal which field failed validation
- [ ] Don't expose internal error messages to users

### User Data:

- [ ] Never display passwordHash anywhere
- [ ] Never log sensitive user data
- [ ] Sanitize and validate all input
- [ ] HTTPS-only communication

---

## Implementation Order (Dependencies-First)

1. **Protected Route Wrapper** ← Foundation for authenticated screens
2. **Login Screen** ← Entry point
3. **Forgot Password Screen** ← Password recovery
4. **Reset Password Screen** ← Completes recovery
5. **User Dashboard/Profile Screen** ← Main authenticated view
6. **Change Password Screen** ← Password management
7. **Register/Create User Screen** ← Admin feature
8. **Navigation/Header Component** ← UI polish

---

## Design Review Checklist

Before implementation begins, design team should provide mockups/designs with:

- [ ] Color scheme and theming
- [ ] Typography and spacing
- [ ] Form input styling and validation states
- [ ] Error message styling
- [ ] Success message styling
- [ ] Loading/spinner states
- [ ] Responsive breakpoints (mobile, tablet, desktop)
- [ ] Accessibility requirements (WCAG)
- [ ] Button states (default, hover, active, disabled)
- [ ] Role badge colors (ADMIN, PASTOR, etc.)
- [ ] Form layout (single column vs multi-column)
- [ ] Modal vs page navigation decisions

---

## Notes

- All screens should follow consistent branding/theming
- All forms should have proper loading states
- All error messages should be user-friendly
- All endpoints should have proper error handling
- All screens should be fully responsive
- All sensitive data must be protected
