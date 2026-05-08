import {
  AuthMain,
  AuthPageFooter,
  AuthPageLayout,
  AuthSupportingIllustration,
  FooterLinks,
  PageFooter,
  SpiritualAccentBg,
} from "./auth-chrome"

interface LoginPageShellProps {
  children: React.ReactNode
}

export function LoginPageShell({ children }: LoginPageShellProps) {
  return (
    <AuthPageLayout>
      <AuthMain>
        <SpiritualAccentBg />

        <div className="gap-2xl px-md lg:gap-3xl relative z-10 flex w-full max-w-6xl flex-col items-center lg:flex-row lg:items-center lg:justify-center">
          {children}

          <AuthSupportingIllustration />
        </div>
      </AuthMain>

      <AuthPageFooter>
        <PageFooter />
        <FooterLinks />
      </AuthPageFooter>
    </AuthPageLayout>
  )
}
