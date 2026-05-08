import {
  AuthDivider,
  AuthFooter,
  AuthHeader,
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

const churchIcon = (
  <svg
    className="text-surface-bright h-8 w-8"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
  </svg>
)

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
    <div className="w-full max-w-lg">
      <div className="border-secondary-container bg-surface-container-lowest p-xl md:p-2xl overflow-hidden rounded-xl border-t-4 shadow-lg">
        <AuthHeader
          icon={churchIcon}
          title="SanctuaryOS"
          subtitle="Sacred Professionalism for Modern Communities"
        />

        {error && <ErrorAlert message={error} />}

        <form onSubmit={onSubmit} className="space-y-lg">
          <label className="space-y-xs block">
            <span className="ml-xs text-label-md font-label-md text-on-surface-variant">
              EMAIL ADDRESS
            </span>
            <input
              type="email"
              value={email}
              onChange={(event) => onEmailChange(event.target.value)}
              placeholder="administrator@church.org"
              className="border-outline-variant bg-surface-bright px-md py-md font-body-md text-on-surface focus:border-on-primary-fixed focus:ring-secondary-container/20 w-full rounded-lg border transition-all focus:ring-2 focus:outline-none"
            />
          </label>

          <label className="space-y-xs block">
            <div className="px-xs flex items-center justify-between">
              <span className="text-label-md font-label-md text-on-surface-variant">
                PASSWORD
              </span>

              <a
                href="/auth/forgot-password"
                className="text-label-sm font-label-sm hover:text-secondary-container text-secondary transition-colors"
              >
                Forgot Password?
              </a>
            </div>
            <input
              type="password"
              value={password}
              onChange={(event) => onPasswordChange(event.target.value)}
              placeholder="••••••••"
              className="border-outline-variant bg-surface-bright px-md py-md font-body-md text-on-surface focus:border-on-primary-fixed focus:ring-secondary-container/20 w-full rounded-lg border transition-all focus:ring-2 focus:outline-none"
            />
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-md gap-sm bg-on-primary-fixed px-md py-md font-title-lg text-title-lg text-surface-bright hover:bg-primary-container flex w-full items-center justify-center rounded-lg shadow-md transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-80"
          >
            {isLoading ? (
              <LoadingSpinner text="Signing In..." />
            ) : (
              <>
                Sign In
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 17l5-5-5-5" />
                  <path d="M15 12H3" />
                </svg>
              </>
            )}
          </button>
        </form>

        <AuthDivider />

        <AuthFooter
          text="New to SanctuaryOS?"
          linkText="Create an account"
          linkHref="/auth/register"
        />
      </div>
    </div>
  )
}
