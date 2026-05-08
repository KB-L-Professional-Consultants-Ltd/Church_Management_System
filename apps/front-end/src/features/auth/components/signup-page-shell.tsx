import { AuthMain, AuthPageLayout, SpiritualAccentBg } from "./auth-chrome"

interface SignupPageShellProps {
  children: React.ReactNode
}

export function SignupPageShell({ children }: SignupPageShellProps) {
  return (
    <AuthPageLayout>
      <AuthMain>
        <div className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full">
          <div className="absolute top-[-20%] right-[-10%] h-150 w-150 rounded-full bg-secondary-container opacity-[0.03] blur-3xl" />
          <div className="absolute bottom-[-20%] left-[-10%] h-150 w-150 rounded-full bg-on-primary-fixed opacity-[0.03] blur-3xl" />
        </div>
        <SpiritualAccentBg />

        <div className="relative z-10 w-full max-w-120">{children}</div>
      </AuthMain>
    </AuthPageLayout>
  )
}
