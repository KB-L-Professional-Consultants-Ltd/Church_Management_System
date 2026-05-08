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

        <div className="relative z-10 w-full max-w-[28rem]">
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
