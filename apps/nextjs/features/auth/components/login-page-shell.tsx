import type { ReactNode } from "react"

import {
  AuthMain,
  AuthPageFooter,
  AuthPageLayout,
  AuthSupportingIllustration,
  FooterLinks,
  PageFooter,
  SpiritualAccentBg,
} from "./auth-layout"

interface LoginPageWrapperProps {
  children: ReactNode
}

export function LoginPageWrapper({ children }: LoginPageWrapperProps) {
  return (
    <AuthPageLayout>
      <AuthMain>
        <SpiritualAccentBg />

        <div className="relative z-10 w-full max-w-120">
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
