import type { ReactNode } from "react"

import {
  AuthMain,
  AuthPageFooter,
  AuthPageLayout,
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
        <div className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full">
          <div className="absolute top-[-18%] right-[-8%] h-160 w-160 rounded-full bg-secondary-container opacity-[0.05] blur-3xl" />
          <div className="absolute bottom-[-20%] left-[-12%] h-160 w-160 rounded-full bg-on-primary-fixed opacity-[0.03] blur-3xl" />
        </div>
        <SpiritualAccentBg />

        <div className="relative z-10 w-full max-w-md">{children}</div>
      </AuthMain>

      <AuthPageFooter>
        <PageFooter />
        <FooterLinks />
      </AuthPageFooter>
    </AuthPageLayout>
  )
}
