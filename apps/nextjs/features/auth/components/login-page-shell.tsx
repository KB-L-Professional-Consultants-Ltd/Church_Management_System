import {
  AuthMain,
  AuthPageFooter,
  AuthPageLayout,
  AuthSupportingIllustration,
  FooterLinks,
  PageFooter,
  SpiritualAccentBg,
} from "./auth-layout"
import type { ReactNode } from "react"

interface LoginPageWrapperProps {
  children: ReactNode
}

export function LoginPageWrapper({ children }: LoginPageWrapperProps) {
  return (
    <AuthPageLayout>
      <AuthMain>
        <SpiritualAccentBg />

        <div className="relative z-10 w-full max-w-md">
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