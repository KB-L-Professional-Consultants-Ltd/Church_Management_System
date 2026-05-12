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

interface SignupPageWrapperProps {
  children: ReactNode
}

export function SignupPageWrapper({ children }: SignupPageWrapperProps) {
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
