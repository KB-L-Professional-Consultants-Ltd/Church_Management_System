import {
  AuthDivider,
  AuthFooter,
  ErrorAlert,
  LoadingSpinner,
} from "./auth-chrome"

interface LoginFormSectionProps {
  email: string
  password: string
  error: string | null
  isLoading: boolean
  onEmailChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export function LoginFormSection({
  email,
  password,
  error,
  isLoading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: LoginFormSectionProps) {
  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-xl border-t-4 border-secondary-container bg-surface-container-lowest p-8 shadow-lg">
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-on-primary-fixed shadow-md">
            <span className="material-symbols-outlined text-[32px] text-surface-bright">
              church
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg tracking-tight text-on-primary-fixed">
            SanctuaryOS
          </h1>
          <p className="mt-1 font-body-sm text-on-surface-variant">
            Sacred Professionalism for Modern Communities
          </p>
        </div>

        {error && <ErrorAlert message={error} />}

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="ml-1 block font-label-md text-label-md text-on-surface-variant"
            >
              EMAIL ADDRESS
            </label>
            <div className="group relative">
              <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-outline transition-colors group-focus-within:text-on-primary-fixed">
                mail
              </span>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => onEmailChange(event.target.value)}
                placeholder="administrator@church.org"
                className="w-full rounded-lg border border-outline-variant bg-surface-bright py-4 pr-4 pl-12 font-body-md text-on-surface transition-all focus:border-on-primary-fixed focus:ring-2 focus:ring-secondary-container/20 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between px-1">
              <label
                htmlFor="password"
                className="font-label-md text-label-md text-on-surface-variant"
              >
                PASSWORD
              </label>
              <a
                href="/auth/forgot-password"
                className="font-label-sm text-label-sm text-secondary transition-colors hover:text-secondary-container"
              >
                Forgot Password?
              </a>
            </div>
            <div className="group relative">
              <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-outline transition-colors group-focus-within:text-on-primary-fixed">
                lock
              </span>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(event) => onPasswordChange(event.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-outline-variant bg-surface-bright py-4 pr-4 pl-12 font-body-md text-on-surface transition-all focus:border-on-primary-fixed focus:ring-2 focus:ring-secondary-container/20 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-on-primary-fixed py-4 font-title-lg text-title-lg text-surface-bright shadow-md transition-all hover:bg-primary-container active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70"
          >
            {isLoading ? (
              <LoadingSpinner text="Signing In..." />
            ) : (
              <>
                Sign In
                <span className="material-symbols-outlined text-[20px]">
                  login
                </span>
              </>
            )}
          </button>
        </form>

        <AuthDivider />

        <AuthFooter
          text="New to SanctuaryOS?"
          linkText="Create an account"
          linkHref="/register"
        />
      </div>
    </div>
  )
}
